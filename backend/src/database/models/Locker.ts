import { Schema, model, Model, Document } from 'mongoose';
import { IUser } from './User';
import { IPin } from './Pin';

export interface ILocker extends Document {
  _id: string;
  user: IUser;
  pin: IPin;
}

export interface ILockerModel extends Model<ILocker> {
  lockerList(userId: string, cursor?: string): Promise<any>;
  checkExists(userId: string, pinId: string): Promise<any>;
}

const Locker = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  pin: {
    type: Schema.Types.ObjectId,
    ref: 'Pin',
    index: true,
  },
});

Locker.statics.lockerList = function(
  userId: string,
  cursor?: string
): Promise<any> {
  const query = Object.assign(
    {},
    cursor ? { _id: { $lt: cursor }, user: userId } : { user: userId }
  );

  return this.find(query)
    .populate({
      path: 'pin',
      populate: [
        {
          path: 'user',
          model: 'User',
        },
      ],
    })
    .sort({ _id: -1 })
    .limit(10)
    .lean();
};

Locker.statics.checkExists = function(
  userId: string,
  pinId: string
): Promise<any> {
  return this.findOne({
    $and: [{ user: userId }, { pin: pinId }],
  }).lean();
};

const LockerModel = model<ILocker>('Locker', Locker) as ILockerModel;

export default LockerModel;
