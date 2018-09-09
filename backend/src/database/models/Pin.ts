import { Schema, model, Document, Model } from "mongoose";
import { IUser } from "./User";

export interface IPin extends Document {
    _id: string;
    user?: IUser;
    title?: string;
    body?: string;
    relationUrl?: string;
    urls?: string[];
    likes?: number;
    comments?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IPinModel extends Model<IPin> {
    readPinById(pinId: string): Promise<any>;
    readPinList(userId?: string, cursor?: string): Promise<any>;
    comment(pinId: string): Promise<any>;
    uncomment(pinId: string): Promise<any>;
    like(pinId: string): Promise<any>;
    unlike(pinId: string): Promise<any>;
}

const Pin = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    body: {
        type: String,
    },
    relationUrl: {
        type: String,
    },
    urls: {
        type: [String],
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
}, { 
    timestamps: true, 
});

Pin.statics.readPinById = function(pinId: string): Promise<any> {    
    return this.findById(pinId)
    .populate("user")
    .lean()
    .exec();
};

Pin.statics.readPinList = function(userId?: string, cursor?: string): Promise<any> {
    const query = Object.assign(
        {},
        cursor && !userId ? { _id: { $lt: cursor } } : { },
        userId && !cursor ? { user: userId } : { },
        userId && cursor ? { _id: { $lt: cursor }, user: userId } : { },
    );
    return this.find(query)
    .populate("user")
    .sort({ _id: -1 })
    .limit(5)
    .lean();
};

Pin.statics.like = function(pinId: string): Promise<any> {
    return this.findByIdAndUpdate(pinId, {
        $inc: { likes: 1 },
    }, { new: true })
    .lean();
};

Pin.statics.unlike = function(pinId: string): Promise<any> {
    return this.findByIdAndUpdate(pinId, {
        $inc: { likes: -1 },
    }, { new: true })
    .lean();
};

Pin.statics.comment = function(pinId: string): Promise<any> {
    return this.findByIdAndUpdate(pinId, {
        $inc: { comments: 1 },
    }, { new: true })
    .lean();
};

Pin.statics.uncomment = function(pinId: string): Promise<any> {
    return this.findByIdAndUpdate(pinId, {
        $inc: { comments: -1 },
    }, { new: true })
    .lean();
};

const PinModel = model<IPin>("Pin", Pin) as IPinModel;

export default PinModel;
