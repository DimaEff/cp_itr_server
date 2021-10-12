import {forwardRef, Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import {CommentsService} from './comments.service';
import {Task} from "../tasks/task.model";
import {User} from "../users/users.model";
import {Comment} from './comment.model';
import {UserCommentRating} from "./user-comment-rating.model";
import {UserTaskSolved} from "../solutions/user-task-solved.model";
import {HelperModule} from "../helper/helper.module";


@Module({
    providers: [CommentsService],
    imports: [
        SequelizeModule.forFeature([Task, User, Comment, UserCommentRating, UserTaskSolved]),
        HelperModule,
    ],
    exports: [
        CommentsService,
    ]
})
export class CommentsModule {
}
