import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {Task} from "./task.model";


interface SolutionCreationAttrs {
    text: string;
    task_id: number;
}

@Table({tableName: 'solutions'})
export class Solution extends Model<Solution, SolutionCreationAttrs> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '20x'})
    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ForeignKey(() => Task)
    @Column({type: DataType.INTEGER, allowNull: false})
    task_id: number;

    @ApiProperty({example: Task})
    @BelongsTo(() => Task)
    task: () => Task;
}