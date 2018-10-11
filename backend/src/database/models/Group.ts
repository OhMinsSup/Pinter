import { Model, Document, Schema, model } from 'mongoose';
import { IUser } from './User';

export interface IGroup extends Document {
    _id: string;
    title: string;
    user: IUser;
    activation: boolean,
}

export interface IGroupModel extends Model<IGroup> {

}

const Group = new Schema({
    title: {
        type: String,
        lowercase: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    activation: {
        type: Boolean,
        default: false
    }
});

const GroupModel = model<IGroup>("Group", Group) as IGroupModel;

export default GroupModel;
