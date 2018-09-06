import { Schema, model, Document, Model } from "mongoose";
import { IUser } from "./User";

export interface ICount extends Document {
    _id: string;
    user?: IUser;
    follower?: number;
    following?: number;
    pin?: number;
}

export interface ICountModel extends Model<ICount> {
    followerCount(userId: string): Promise<any>;
    unfollowerCount(userId: string): Promise<any>;
    followingCount(userId: string): Promise<any>;
    unfollowingCount(userId: string): Promise<any>;
    pinCount(userId: string): Promise<any>;
    unpinCount(userId: string): Promise<any>;
}

const Count = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    follower: {
        type: Number,
        default: 0,
    },
    following: {
        type: Number,
        default: 0,
    },
    pin: {
        type: Number,
        default: 0,
    },
}, {
    autoIndex: true,
});

Count.statics.followerCount = function(userId: string): Promise<any> {
    return this.findOneAndUpdate({
        user: userId,
    }, {
        $inc: { follower: 1 },
    }, {
        new: true,
        select: "follower",
    })
    .lean();
};

Count.statics.unfollowerCount = function(userId: string): Promise<any> {
    return this.findOneAndUpdate({
        user: userId,
    }, {
        $inc: { follower: -1 },
    }, {
        new: true,
        select: "follower",
    })
    .lean();
};

Count.statics.followingCount = function(userId: string): Promise<any> {
    return this.findOneAndUpdate({
        user: userId,
    }, {
        $inc: { following: 1 },
    }, {
        new: true,
        select: "following",
    })
    .lean();
};

Count.statics.unfollowingCount = function(userId: string): Promise<any> {
    return this.findOneAndUpdate({
        user: userId,
    }, {
        $inc: { following: -1 },
    }, {
        new: true,
        select: "following",
    })
    .lean();
};

Count.statics.pinCount = function(userId: string): Promise<any> {
    return this.findOneAndUpdate({
        user: userId,
    }, {
        $inc: { pin: 1 },
    }, {
        new: true,
        select: "pin",
    })
    .lean();
},

Count.statics.unpinCount = function(userId: string): Promise<any> {
    return this.findOneAndUpdate({
        user: userId,
    }, {
        $inc: { pin: -1 },
    }, {
        new: true,
        select: "pin",
    })
    .lean();
};

const CountModel = model<ICount>("Count", Count) as ICountModel;

export default CountModel;