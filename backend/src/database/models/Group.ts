import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from './User';
import { IPin } from './Pin';

export interface IGroup extends Document {
    _id: string;
    user?: IUser[];
    pin?: IPin[];
    title: string;
    type: string;
}

export interface IGroupModel extends Model<IGroup> {

}

const Group = new Schema({
    user: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    pin: [{
        type: Schema.Types.ObjectId,
        ref: "Pin",
    }],
    title: String,
    type: {
        type: String,
        default: 'publie',
    },
});

const GroupModel = model<IGroup>("Group", Group) as IGroupModel;

export default GroupModel;