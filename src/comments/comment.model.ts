import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {Task} from "../tasks/task.model";
import {User} from "../users/users.model";
import {UserCommentRating} from "./user-comment-rating.model";


interface CommentCreationAttrs {
    text: string;
    task_id: number;
    user_id: number;
}

@Table({tableName: 'comments'})
export class Comment extends Model<Comment, CommentCreationAttrs> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '20x'})
    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ForeignKey(() => Task)
    @Column({type: DataType.INTEGER})
    task_id: number;

    @ApiProperty({example: Task})
    @BelongsTo(() => Task)
    task: () => Task;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;

    @ApiProperty({example: User})
    @BelongsTo(() => User)
    author: () => User;

    @HasMany(() => UserCommentRating)
    ratings: UserCommentRating[];

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    total_rating: number;
}