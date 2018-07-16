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
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPinModel extends Model<IPin> {
    readPinById(pinId: string): Promise<any>;
}

const Pin = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Pin_Tag'
        }
    ],
    description: String,
    relation_url: String,
    url: String,
}, { 
    timestamps: true 
});

Pin.statics.readPinById = async function(pinId: string): Promise<any> {
    return await this.findOne({
        _id: pinId
    })
    .populate('user')
    .populate({
        path: 'tags',
        select: 'tag',
        populate: {
            path: 'tag',
            model: 'Tag'
        }
    });
}

const PinModel = model<IPin>('Pin', Pin) as IPinModel;

export default PinModel;
