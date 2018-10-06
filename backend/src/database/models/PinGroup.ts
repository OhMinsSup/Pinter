import { Model, Document, Schema, model } from 'mongoose';

export interface IPinGroup extends Document {
    _id: string;
}

export interface IPinGroupModel extends Model<IPinGroup> {

}

const PinGroup = new Schema({
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const PinGroupModel = model<IPinGroup>("PinGroup", PinGroup) as IPinGroupModel;

export default PinGroupModel;
