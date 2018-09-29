import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from './User';

export interface IGroup extends Document {
    _id: string;
    creator?: IUser;
    cover?: string;
    title?: string;
    contents?: string;
    creatrAt?: string;
    updateAt?: string;
}

export interface IGroupModel extends Model<IGroup> {

}

const Group = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    cover: String,
    title: String,
    contents: String,
}, {
    timestamps: true
});

const GroupModel = model<IGroup>("Group", Group) as IGroupModel;

export default GroupModel;