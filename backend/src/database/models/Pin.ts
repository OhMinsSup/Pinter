import { Schema, model, Document, Model, Types } from 'mongoose';
import { IUser } from './User';
import { ITag } from './Tag';

export interface IPin extends Document {
    _id: string;
    user?: IUser;
    title?: string;
    description?: string;
    relation_url?: string;
    urls?: Array<string>;
    tags?: Array<ITag>;
    likes?: number;
    comments?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPinModel extends Model<IPin> {
    readPinById(pinId: string): Promise<any>;
    like(pinId: string): Promise<any>;
    unlike(pinId: string): Promise<any>;
    readPinList(userId?: string, cursor?: string): Promise<any>;
    comment(pinId: string): Promise<any>;
    uncomment(pinId: string): Promise<any>;
}

const Pin = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    description: String,
    relation_url: String,
    urls: [String],
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    }
}, { 
    timestamps: true 
});

Pin.statics.readPinById = function(pinId: string): Promise<any> {    
    return this.findById(pinId)
    .populate('user')
    .populate({
        path: 'tags',
        populate: [{
            path: 'tags',
        }]
    })
}

Pin.statics.readPinList = function(userId?: string, cursor?: string): Promise<any> {
    const query = Object.assign(
        {},
        cursor && !userId ? { _id: { $lt: cursor } } : { },
        userId && cursor ? { _id: { $lt: cursor }, user: userId } : { } 
    );

    return this.find(query)
    .populate('user')
    .populate({
        path: 'tags',
        populate: [{
            path: 'tags'
        }]
    })
    .sort({ _id: -1 })
    .limit(5);
}

Pin.statics.like = function(pinId: string): Promise<any> {
    return this.findByIdAndUpdate(pinId, {
        $inc: { likes: 1 }
    }, { new: true });
}

Pin.statics.unlike = function(pinId: string): Promise<any> {
    return this.findByIdAndUpdate(pinId, {
        $inc: { likes: -1 }
    }, { new: true });
}

Pin.statics.comment = function(pinId: string): Promise<any> {
    return this.findByIdAndUpdate(pinId, {
        $inc: { comments: 1 }
    }, { new: true });
}

Pin.statics.uncomment = function(pinId: string): Promise<any> {
    return this.findByIdAndUpdate(pinId, {
        $inc: { comments: -1 }
    }, { new: true });
}

const PinModel = model<IPin>('Pin', Pin) as IPinModel;

export default PinModel;
