import { Schema, model, Document, Model } from 'mongoose';
import { IPin } from './Pin';
import { IUser } from './User';
import { IGroup } from './Group';

export interface IGroupPin extends Document {
    _id: string;
    group?: IGroup;
    user?: IUser;
    pin?: IPin;
}

export interface IGroupPinModel extends Model<IGroupPin> {

}

const GroupPin = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin',
    },
});

const GroupPinModel = model<IGroupPin>('GroupPin', GroupPin) as IGroupPinModel;

export default GroupPinModel;