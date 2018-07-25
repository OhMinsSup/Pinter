import { Schema, model, Model, Document } from 'mongoose';
import { IPin } from './Pin';
import { IUser } from './User';

export interface IRead extends Document {
    _id: string;
    user?: IUser;
    pin?: IPin;
    ip?: string;
}

export interface IReadModel extends Model<IRead> {

}

const Read = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    },
    ip: String
});

const ReadModel = model<IRead>('Read', Read) as IReadModel;

export default ReadModel;