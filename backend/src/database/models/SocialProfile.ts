import { Table, Model, Default, DataType, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User';

export interface ISocialProfile {
    id: string;
    social_id: string;
    access_token: string;
    provider: string;
    fk_user_id: string;
}

@Table({
    timestamps: true,
    tableName: 'social_profile',
    modelName: 'social_profile',
    freezeTableName: true,
})
class SocailProfile extends Model<SocailProfile> {
    @Default(DataType.UUIDV1)
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    public id: string;

    @Column(DataType.STRING)
    public social_id: string;

    @Column(DataType.STRING)
    public access_token: string;

    @Column(DataType.STRING)
    public provider: string;  

    @ForeignKey(() => User)
    public fk_user_id: string;

    @BelongsTo(() => User)
    public user: User;
}

export default SocailProfile;