import { Document, Model, Schema, model } from 'mongoose';
import { IPin } from './Pin';
import { IGroup } from './Group';

export interface IGroupPin extends Document {
    _id: string;
    pin?: IPin;
    group?: IGroup;
}

export interface IGroupPinModel extends Model<IGroupPin> {

}

const GroupPin = new Schema({
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin',
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: "Group"
    }
});

const GroupPinModel = model<IGroupPin>('GroupPin', GroupPin) as IGroupPinModel;

export default GroupPinModel;