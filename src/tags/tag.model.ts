import {Column, DataType, BelongsToMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {Task} from "../tasks/task.model";
import {TaskTag} from "../tasks/task_tag.model";


interface TagCreationAttrs {
    title: string;
}

@Table({tableName: 'tags'})
export class Tag extends Model<Tag, TagCreationAttrs> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'java script'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @BelongsToMany(() => Task, () => TaskTag)
    tasks: Task[];
}