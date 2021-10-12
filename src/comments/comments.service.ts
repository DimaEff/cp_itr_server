import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import {Comment} from "./comment.model";
import {AddCommentDto} from "./dto/add_comment.dto";
import {UserCommentRating} from "./user-comment-rating.model";
import {AddCommentRatingDto} from "./dto/add_comment_rating.dto";
import {User} from "../users/users.model";
import {HelperService} from "../helper/helper.service";


@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private commentsRepository: typeof Comment,
                @InjectModel(UserCommentRating) private commentsRatingsRepository: typeof UserCommentRating,
                private helperService: HelperService) {}

    async addComment(dto: AddCommentDto) {
        const comment = await this.commentsRepository.create(dto);
        return comment;
    }

    async getComment(id: number) {
        const comment = await this.commentsRepository.findByPk(id, {include: {all: true}});
        return comment;
    }

    async addRating(dto: AddCommentRatingDto) {
        await this.checkIsUserRatingExistsAndThrowHttpException(dto.comment_id, dto.user_id);

        const rating = await this.commentsRatingsRepository.create(dto);
        await this.updateTotalRating(rating.comment_id);
        return rating;
    }

    private async getRatingByCommentAndUserId(comment_id: number, user_id: number) {
        const rating = await this.commentsRatingsRepository.findOne({
            include: [
                {
                    model: Comment,
                    where: {id: comment_id},
                },
                {
                    model: User,
                    where: {id: user_id},
                },
            ]
        });
        return rating;
    }

    private async checkIsUserRatingExistsAndThrowHttpException(comment_id: number, user_id: number) {
        const rating = await this.getRatingByCommentAndUserId(comment_id, user_id);

        if (rating) {
            throw new HttpException('The rating of this user already exists', HttpStatus.BAD_REQUEST);
        }
    }

    private async updateTotalRating(comment_id: number) {
        const comment = await this.getComment(comment_id);

        const total_rating = this.helperService.getRatingSum(comment);
        comment.total_rating = total_rating;
        await comment.save();
    }
}
