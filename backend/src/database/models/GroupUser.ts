import { Schema, model, Model, Document } from 'mongoose';
import { IUser } from './User';
import { IGroup } from './Group';

export interface IGroupUser extends Document {
    _id: string;
    groupId?: IGroup;
    userId?: IUser;
}

export interface IGroupUserModel extends Model<IGroupUser> {
    checkExists(userId: string, groupId: string): Promise<any>
}

const GroupUser = new Schema({
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

GroupUser.statics.checkExists = function(userId: string, groupId: string): Promise<any> {
    return this.findOne({
        $and: [
            { userId: userId },
            { groupId: groupId },
        ], 
    })
    .lean();
}

const GroupUserModel = model<IGroupUser>('GroupUser', GroupUser) as IGroupUserModel;

export default GroupUserModel;
