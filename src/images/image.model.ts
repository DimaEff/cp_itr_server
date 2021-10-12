import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {Task} from "../tasks/task.model";


interface ImageCreationAttrs {
    image_url: string;
    task_id: number;
}

@Table({tableName: 'images'})
export class Image extends Model<Image, ImageCreationAttrs> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: `https://storage.googleapis.com/staging.cp-itr.appspot.com/123123.jpg`})
    @Column({type: DataType.STRING, allowNull: false})
    image_url: string;

    @ForeignKey(() => Task)
    @Column({type: DataType.INTEGER, allowNull: false})
    task_id: number;

    @ApiProperty({example: Task})
    @BelongsTo(() => Task)
    task: () => Task;
}