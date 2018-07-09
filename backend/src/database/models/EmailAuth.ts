import { Table, Column, Model, DataType, Default, Unique } from 'sequelize-typescript';
import * as shortid from 'shortid'; 


export interface IEmailAuth {
    id: string;
    code: string;
    email: string;
    logged: boolean;
}

@Table({
    timestamps: true,
    tableName: 'email_auth',
    modelName: 'email_auth',
    freezeTableName: true,
})
class EmailAuth extends Model<EmailAuth> {
    @Default(DataType.UUIDV1)
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    public id: string;

    @Unique
    @Default(shortid.generate)
    @Column(DataType.STRING)
    public code: string;

    @Column(DataType.STRING)
    public email: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    public logged: boolean;
}

export default EmailAuth;