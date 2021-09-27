import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {Task} from "../tasks/task.model";


interface ThemeCreationAttrs {
    title: string;
}

@Table({tableName: 'themes'})
export class Theme extends Model<Theme, ThemeCreationAttrs> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'it'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @HasMany(() => Task)
    tasks: Task[];
}