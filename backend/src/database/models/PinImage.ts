import { Table, Model, Default, DataType, Column, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Pin from './Pin';
import User from './User';

export interface IPinImage {
    id: string;
    file_name: string;
    file_size: number;
    file_url: string; 
    fk_user_id: string;
    fk_pin_id: string;
}

@Table({
    timestamps: true,
    tableName: 'pin_image',
    modelName: 'pin_image',
    freezeTableName: true,
})
class PinImage extends Model<PinImage> {
    @Default(DataType.UUIDV1)
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    public id: string;

    @Column(DataType.STRING)
    public file_name: string;

    @Column(DataType.INTEGER)
    public file_size: number;

    @Column(DataType.STRING)
    public file_url: string;

    @ForeignKey(() => User)
    fk_user_id: string;

    @BelongsTo(() => User)
    public user: User;

    @ForeignKey(() => Pin)
    fk_pin_id: string;

    @BelongsTo(() => Pin)
    public pin: Pin;
}

export default PinImage;