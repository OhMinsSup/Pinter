import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from './User';

export interface IGroup extends Document {
    _id: string;
    title?: string;
    thumbnail?: string;
    description?: string;
    creator?: IUser;
}

export interface IGroupModel extends Model<IGroup> {
    readGroupId(groupId: string): Promise<any>;
}

const Group = new Schema({
    title: String,
    thumbnail: String,
    description: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

Group.statics.readGroupId = function(groupId: string): Promise<any> {
    return this.findById(groupId)
    .populate('creator');
};

const GroupModel = model<IGroup>("Group", Group) as IGroupModel;

export default GroupModel;