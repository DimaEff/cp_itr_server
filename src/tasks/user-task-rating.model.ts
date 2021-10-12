import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {User} from "../users/users.model";
import {Task} from "./task.model";


interface UserTaskRatingCreationAttrs {
    rating: number;
    task_id: number;
    user_id: number;
}

@Table({tableName: 'user-task-rating'})
export class UserTaskRating extends Model<UserTaskRating, UserTaskRatingCreationAttrs> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 2, description: 'Must be from 1 to 5'})
    @Column({type: DataType.INTEGER, allowNull: false})
    rating: number;

    @ForeignKey(() => Task)
    @Column({type: DataType.INTEGER})
    task_id: number;

    @BelongsTo(() => Task)
    task: () => Task;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;

    @BelongsTo(() => User)
    author: () => User;
}