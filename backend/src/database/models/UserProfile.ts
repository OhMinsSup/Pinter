import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo, AllowNull,  } from 'sequelize-typescript';
import User from './User';

export interface IUserProfile {
    id: string;
    display_name: string;
    thumbnail: string;
    fk_user_id: string;
}

@Table({
    timestamps: true,
    tableName: 'user_profile',
    modelName: 'user_profile',
    freezeTableName: true,
})
class UserProfile extends Model<UserProfile> {
    @Default(DataType.UUIDV1)
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    public id: string;

    @Column(DataType.STRING)
    public display_name: string;

    @Default('https://avatars.io/platform/userId')
    @Column(DataType.STRING)
    public thumbnail: string;
    
    @ForeignKey(() => User)
    public fk_user_id: string;

    @BelongsTo(() => User)
    public user: User;
}

export default UserProfile;