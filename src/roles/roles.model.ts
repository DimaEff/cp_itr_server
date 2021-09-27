import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

import {User} from '../users/users.model';
import {UserRole} from './user_role.model';


interface RoleCreationAttrs {
    value: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({example: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[];
}