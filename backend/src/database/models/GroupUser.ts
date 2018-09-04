import { Schema, model, Document, Model } from 'mongoose';
import { IGroup } from './Group';
import { IUser } from './User';

export interface IGroupUser extends Document {
    _id: string;
    group?: IGroup;
    user?: IUser;
}

export interface IGroupUserModel extends Model<IGroupUser> {

}

const GroupUser = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const GroupUserModel = model<IGroupUser>('GroupUser', GroupUser) as IGroupUserModel;

export default GroupUserModel;