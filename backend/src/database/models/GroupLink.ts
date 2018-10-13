import { Schema, Document, Model, model } from 'mongoose';
import { IGroup } from './Group';
import { IPin } from './Pin';

export interface IGroupLink extends Document {
    _id: string;
    group: IGroup;
    pin: IPin;
}

export interface IGroupLinkModel extends Model<IGroupLink> {

}

const GroupLink = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    }
});

const GroupLinkModel = model<IGroupLink>('GroupLink', GroupLink) as IGroupLinkModel;

export default GroupLinkModel;