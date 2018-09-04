import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from './User';

export interface IGroup extends Document {
    _id: string;
    title: string;
    creator?: IUser;
}

export interface IGroupModel extends Model<IGroup> {

}

const Group = new Schema({
    title: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const GroupModel = model<IGroup>("Group", Group) as IGroupModel;

export default GroupModel;