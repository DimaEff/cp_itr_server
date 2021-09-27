import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {Role} from "../roles/roles.model";
import {UserRole} from '../roles/user_role.model';


interface UserCreationAttrs {
    sn_uid: string;
    user_name: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 's12fqf21'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    sn_uid: string;

    @ApiProperty({example: 'Дмитрий Фоминенков'})
    @Column({type: DataType.STRING, allowNull: false})
    user_name: string;

    @ApiProperty({example: true})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];
}