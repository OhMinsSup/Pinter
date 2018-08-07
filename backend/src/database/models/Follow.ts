import { Schema, model, Model, Document } from "mongoose";
import { IUser } from "./User";

export interface IFollow extends Document {
    _id: string;
    following?: IUser;
    follower?: IUser;
}

export interface IFollowModel extends Model<IFollow> {
    checkExists(userId: string, followId: string): Promise<any>;
    followingList(followerId: string, cursor?: string): Promise<any>;
    followerList(followingId: string, cursor?: string): Promise<any>;
}

const Follow = new Schema({
    following: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

Follow.statics.checkExists = function(userId: string, followId: string): Promise<any> {
    return this.findOne({
        $and: [
            { following : followId },
            { follower : userId },
        ],
    });
};

Follow.statics.followingList = function(followerId: string, cursor?: string): Promise<any> {
    const query = Object.assign(
        {},
        cursor ? { _id: { $lt: cursor}, follower: followerId} : { follower: followerId }, 
    );
    return this.find(query)
    .populate("following")
    .sort({ _id: -1 })
    .limit(10);
};

Follow.statics.followerList = function(followingId: string, cursor?: string): Promise<any> {
    const query = Object.assign(
        {},
        cursor ? { _id: { $lt: cursor}, following: followingId } : { following: followingId }, 
    );
    return this.find(query)
    .populate("follower")
    .sort({ _id: -1 })
    .limit(10);
};

const FollowModel = model<IFollow>("Follow", Follow) as IFollowModel;

export default FollowModel;