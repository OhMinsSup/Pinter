import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from './User';
import { ITag } from './Tag';

export interface IPin extends Document {
    _id: string;
    user?: IUser;
    title?: string;
    description?: string;
    relation_url?: string;
    url?: string;
    tags?: Array<ITag>;
}

export interface IPinModel extends Model<IPin> {
    readPinById(pinId: string): Promise<any>
}

const Pin = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    relation_url: String,
    url: String,
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
}, { 
    timestamps: true 
});

Pin.statics.readPinById = async function(pinId: string): Promise<any> {
    return this.findOne(pinId)
}

const PinModel = model<IPin>('Pin', Pin) as IPinModel;

export default PinModel;
