import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {User} from "../users/users.model";
import {Solution} from "./solution.model";


interface TaskCreationAttrs {
    title: string;
    text: string;
    user_id: number;
    // theme_id: number;
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

    @ApiProperty({example: User})
    @BelongsTo(() => User)
    author: () => User;

    @ApiProperty({example: [Solution]})
    @HasMany(() => Solution)
    solutions: Solution[];

    // @ForeignKey(() => Theme)
    // @Column({type: DataType.INTEGER, allowNull: false})
    // theme_id: number;

    // @ApiProperty({example: Theme})
    // @BelongsToMany()
    // theme: Theme;

    // @ApiProperty({example: Image[]})
    // @HasMany(() => Image)
    // theme: Image[];
}