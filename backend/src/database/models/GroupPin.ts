import { Schema, model, Model, Document } from 'mongoose';
import { IGroup } from './Group';
import { IPin } from './Pin';

export interface IGroupPin extends Document {
    _id: string;
    groupId?: IGroup;
    pinId?: IPin;
}

export interface IGroupPinModel extends Model<IGroupPin> {
    checkExists(userId: string, groupId: string): Promise<any>;
}

const GroupPin = new Schema({
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
    },
    pinId: {
        type: Schema.Types.ObjectId,
        ref: 'Pin',
    },
});

GroupPin.statics.checkExists = function(pinId: string, groupId: string): Promise<any> {
    return this.findOne({
        $and: [
            { pinId: pinId },
            { groupId: groupId },
        ], 
    })
    .lean();
}

const GroupPinModel = model<IGroupPin>('GroupPin', GroupPin) as IGroupPinModel;

export default GroupPinModel;
