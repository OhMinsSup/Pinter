import { Model, Default, Column, DataType, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User';

export interface IPin {
    id: string;
    relation_url: string;
    description: string;
    url: string;
    fk_user_id: string;
}

@Table({
    timestamps: true,
    tableName: 'pin',
    modelName: 'pin',
    freezeTableName: true,
})
class Pin extends Model<Pin> {
    @Default(DataType.UUIDV1)
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    public id: string;

    @Column(DataType.STRING)
    public relation_url: string;

    @Column(DataType.STRING)
    public description: string;

    @Column(DataType.STRING)
    public url: string;

    @ForeignKey(() => User)
    fk_user_id: string;

    @BelongsTo(() => User) 
    public user: User;
}

export default Pin;