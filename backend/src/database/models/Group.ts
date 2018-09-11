import { Schema, model, Model, Document } from 'mongoose';
import { IUser } from './User';

export interface IGroup extends Document {
    _id: string;
    title?: string;
    description?: string;
    coverThumbnail?: string;
    creator?: IUser;
    visibility?: string;
    users?: number;
    pins?: number;
}

export interface IGroupModel extends Model<IGroup> {
    userCounts(groupId: string): Promise<any>;
    unUserCounts(groupId: string): Promise<any>;
    pinCounts(groupId: string): Promise<any>;
    unPinCounts(groupId: string): Promise<any>;
}

const Group = new Schema({
    title: String,
    description: String,
    coverThumbnail: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    users: {
        type: Number,
        default: 0,
    },
    pins: {
        type: Number,
        default: 0,
    },
});

Group.statics.userCounts = function(groupId: string): Promise<any> {
    return this.findByIdAndUpdate(groupId, {
        $inc: { 
            users: 1 
        },
    }, { new: true })
    .lean();
};

Group.statics.unUserCounts = function(groupId: string): Promise<any> {
    return this.findByIdAndUpdate(groupId, {
        $inc: { 
            users: -1 
        },
    }, { new: true })
    .lean();
}

Group.statics.pinCounts = function(groupId: string): Promise<any> {
    return this.findByIdAndUpdate(groupId, {
        $inc: { pins: 1 },
    }, { new: true })
    .lean();
};

Group.statics.unPinCounts = function(groupId: string): Promise<any> {
    return this.findByIdAndUpdate(groupId, {
        $inc: { pins: -1 },
    }, { new: true })
    .lean();
};

const GroupModel = model<IGroup>('Group', Group) as IGroupModel;

export default GroupModel;

