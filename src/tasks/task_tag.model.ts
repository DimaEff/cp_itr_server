import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";

import {Task} from "./task.model";
import {Tag} from "../tags/tag.model";


@Table({tableName: 'task_tag', updatedAt: false, createdAt: false})
export class TaskTag extends Model<TaskTag> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Task)
    @Column({type: DataType.INTEGER})
    task_id: number;

    @ForeignKey(() => Tag)
    @Column({type: DataType.INTEGER})
    tag_id: number;
}