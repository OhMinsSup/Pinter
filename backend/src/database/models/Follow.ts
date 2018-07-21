import { Schema, model, Model, Document } from 'mongoose';
import { IUser } from './User';

export interface IFollow extends Document {
    _id: string;
    following?: IUser;
    follower?: IUser;
}

export interface IFollowModel extends Model<IFollow> {}

const Follow = new Schema({
    following: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const FollowModel = model<IFollow>('Follow', Follow) as IFollowModel;

export default FollowModel;