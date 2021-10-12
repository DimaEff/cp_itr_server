import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {User} from "../users/users.model";
import {Solution} from "../solutions/solution.model";
import {Theme} from "../themes/theme.model";
import {TaskTag} from "./task_tag.model";
import {Tag} from "../tags/tag.model";
import {Image} from "../images/image.model";
import {Comment} from "../comments/comment.model";
import {UserTaskSolved} from "../solutions/user-task-solved.model";
import {UserTaskRating} from "./user-task-rating.model";


interface TaskCreationAttrs {
    title: string;
    text: string;
    user_id: number;
    theme_id: number;
}

@Table({tableName: 'tasks'})
export class Task extends Model<Task, TaskCreationAttrs> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Задачка про яблоки'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'Текст задачки про яблоки'})
    @Column({type: DataType.STRING, defaultValue: false})
    text: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    user_id: number;

    @BelongsTo(() => User)
    author: () => User;

    @ApiProperty({example: [Solution]})
    @HasMany(() => Solution)
    solutions: Solution[];

    @ForeignKey(() => Theme)
    @Column({type: DataType.INTEGER, allowNull: false})
    theme_id: number;

    @BelongsTo(() => Theme)
    theme: Theme;

    @BelongsToMany(() => Tag, () => TaskTag)
    tags: Tag[];

    @HasMany(() => Image)
    images: Image[];

    @HasMany(() => Comment)
    comments: Comment[];

    @HasMany(() => UserTaskSolved)
    solved_tasks: UserTaskSolved[];

    @HasMany(() => UserTaskRating)
    ratings: UserTaskRating[];

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    total_rating: number;
}