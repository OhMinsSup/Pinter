import { Schema, model, Model, Document } from 'mongoose';
import { IUser } from './User';
import { IPin } from './Pin';

export interface IPinLocker extends Document {
    _id: string;
    user: IUser;
    pin: IPin;
    count: number;
}

export interface IPinLockerModel extends Model<IPinLocker> {
    lockerList(userId: string, cursor?: string): Promise<any>;
    lockerCount(lockerId: string): Promise<any>;
    lockerUnCount(lockerId: string): Promise<any>;
    checkExists(userId: string, pinId: string): Promise<any>;
    countLocker(): Promise<any>
}

const PinLocker = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    },
    count: {
        type: Number,
        default: 0
    }
});

PinLocker.statics.lockerList = function(userId: string, cursor?: string): Promise<any> {
    const query = Object.assign(
        {},
        cursor ? { _id: { $lt: cursor }, user: userId } : { user: userId },
    );

    return this.find(query)
    .populate({
        path: 'pin',
        populate: [{
            path: 'user',
            model: 'User'
        }, {
            path: 'tags',
            model: 'Tag'
        }],
    })
    .sort({ _id: -1 })
    .limit(25);
}

PinLocker.statics.checkExists = function(userId: string, pinId: string): Promise<any> {
    return this.findOne({
        $and: [
            { 'user': userId },
            { 'pin': pinId }
        ]
    });
}

PinLocker.statics.countLocker = function(): Promise<any> {
    return this.aggregate([
        {
            $group: {
                _id: '$user',
                count: { $sum: '$count' }
            }
        }
    ]);
}

PinLocker.statics.lockerCount = function(lockerId: string): Promise<any> {
    return this.findByIdAndUpdate(lockerId, {
        $inc: { count: 1 }
    }, { new: true });
}

PinLocker.statics.lockerUnCount = function(lockerId: string): Promise<any> {
    return this.findByIdAndUpdate(lockerId, {
        $inc: { count: -1 }
    }, { new: true });
}

const PinLockerModel = model<IPinLocker>('PinLocker', PinLocker) as IPinLockerModel;

export default PinLockerModel;