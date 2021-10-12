import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {User} from "../users/users.model";
import {Comment} from './comment.model';


interface UserCommentRatingCreationAttrs {
    rating: number;
    comment_id: number;
    user_id: number;
}

@Table({tableName: 'user-comment-rating'})
export class UserCommentRating extends Model<UserCommentRating, UserCommentRatingCreationAttrs> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 1, description: 'Must be 1 or -1'})
    @Column({type: DataType.INTEGER, allowNull: false})
    rating: number;

    @ForeignKey(() => Comment)
    @Column({type: DataType.INTEGER})
    comment_id: number;

    @BelongsTo(() => Comment)
    comment: () => Comment;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;

    @BelongsTo(() => User)
    author: () => User;
}