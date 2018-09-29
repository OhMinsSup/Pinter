import { Document, Model, Schema, model } from 'mongoose';
import { IUser } from './User';
import { IGroup } from './Group';

export interface IGroupUser extends Document {
    _id: string;
    user?: IUser;
    group?: IGroup;
}

export interface IGroupUserModel extends Model<IGroupUser> {

}

const GroupUser = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: "Group"
    }
});

const GroupUserModel = model<IGroupUser>('GroupUser', GroupUser) as IGroupUserModel;

export default GroupUserModel;