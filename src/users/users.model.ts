import {Column, DataType, Model, Table} from "sequelize-typescript";


interface UserCreationAttrs {
    sn_uid: string;
    user_name: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    sn_uid: string;

    @Column({type: DataType.STRING, allowNull: false})
    user_name: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;
}