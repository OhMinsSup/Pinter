import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from './User';

export interface INotice extends Document {
    _id: string;
    to?: IUser;
    from?: IUser;
    message?: string;
}

export interface INoticeModel extends Model<INotice> {

}

const Notice = new Schema({
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    message: String,
}, {
    timestamps: true,
});

const NoticeModel = model<INotice>('Notice', Notice) as INoticeModel;

export default NoticeModel;