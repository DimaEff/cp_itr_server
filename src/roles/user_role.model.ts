import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";

import {User} from "../users/users.model";
import {Role} from "./roles.model";


@Table({tableName: 'user_role', updatedAt: false, createdAt: false})
export class UserRole extends Model<UserRole> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    role_id: number;
}