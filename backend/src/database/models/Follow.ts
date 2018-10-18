import { Schema, model, Model, Document } from 'mongoose';
import { IUser } from './User';

export interface IFollow extends Document {
  _id: string;
  following?: IUser;
  follower?: IUser;
}

export interface IFollowModel extends Model<IFollow> {
  checkExists(userId: string, followId: string): Promise<any>;
  followingList(followerId: string, cursor: boolean | null): Promise<any>;
  followerList(followingId: string, cursor: boolean | null): Promise<any>;
}

const Follow = new Schema({
  following: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
});

Follow.statics.checkExists = function(
  userId: string,
  followId: string
): Promise<any> {
  return this.findOne({
    $and: [{ following: followId }, { follower: userId }],
  })
    .lean()
    .exec();
};

Follow.statics.followingList = function(
  followerId: string,
  cursor: boolean | null
): Promise<any> {
  const data = cursor
    ? this.find({
        follower: followerId,
      })
        .populate('following')
        .sort({ _id: -1 })
        .lean()
        .exec()
    : this.find({
        follower: followerId,
      })
        .populate('following')
        .sort({ _id: -1 })
        .limit(10)
        .lean()
        .exec();

  return data;
};

Follow.statics.followerList = function(
  followingId: string,
  cursor: boolean | null
): Promise<any> {
  const data = cursor
    ? this.find({
        following: followingId,
      })
        .populate('follower')
        .sort({ _id: -1 })
        .lean()
        .exec()
    : this.find({
        following: followingId,
      })
        .populate('follower')
        .sort({ _id: -1 })
        .limit(10)
        .lean()
        .exec();

  return data;
};

const FollowModel = model<IFollow>('Follow', Follow) as IFollowModel;

export default FollowModel;
