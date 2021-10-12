import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {User} from "../users/users.model";
import {Task} from "../tasks/task.model";


interface UserTaskSolvedCreationAttrs {
    solved: boolean;
    task_id: number;
    user_id: number;
}

@Table({tableName: 'user-task-solved'})
export class UserTaskSolved extends Model<UserTaskSolved, UserTaskSolvedCreationAttrs> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: true})
    @Column({type: DataType.BOOLEAN, allowNull: false})
    solved: boolean;

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