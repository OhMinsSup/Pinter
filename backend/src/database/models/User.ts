import { Table, Column, Model, DataType, Default, Unique, HasMany, ForeignKey } from 'sequelize-typescript';
import UserProfile from './UserProfile';

export interface IUser {
    id: string;
    username: string;
    email: string;
}

@Table({
    timestamps: true,
    tableName: 'user',
    modelName: 'user',
    freezeTableName: true,
})
class User extends Model<User> {
    @Default(DataType.UUIDV1)
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    public id: string;

    @Unique
    @Column(DataType.STRING)
    public username: string

    @Unique
    @Column(DataType.STRING)
    public email: string  

    @HasMany(() => UserProfile)
    public profiles: UserProfile[];
}

export default User;