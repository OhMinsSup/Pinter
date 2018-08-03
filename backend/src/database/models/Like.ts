import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from './User';
import { IPin } from './Pin';

export interface ILike extends Document {
    _id: string;
    user?: IUser;
    pin?: IPin;
}

export interface ILikeModel extends Model<ILike> {
    checkExists(userId: string, pinId: string): Promise<any>;
    getLikeUserList(pinId: string, userId: string): Promise<any>;
}

const Like = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    }
});

Like.statics.checkExists = function(userId: string, pinId: string): Promise<any> {
    return this.findOne({
        $and: [
            { 'user': userId },
            { 'pin': pinId }
        ]
    });
}

Like.statics.getLikeUserList = function(pinId: string, userId: string): Promise<any> {
    const query = Object.assign(
        {},
        {
            pin: pinId, 
            user: { $ne: userId } 
        }
    );


    return this.find(query)
    .populate('user')
    .sort({_id: -1}); 
}

const LikeModel = model<ILike>('Like', Like) as ILikeModel;

export default LikeModel;