import { Schema, Model, Document, model, mongo } from 'mongoose';
import { IUser } from './User';
import { INotice } from './Notice';

export interface INoticeMessage extends Document {
    _id: string;
    sender?: IUser;
    recipient?: IUser;
    notice?: INotice;
    message?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface INoticeMessageModel extends Model<INoticeMessage> {

}

const ignoreEmpty = val => (val !== '' ? val : undefined);

const NoticeMessage = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        set: ignoreEmpty,
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        set: ignoreEmpty,
    },
    notice: {
        type: Schema.Types.ObjectId,
        ref: 'Notice',
        index: true,
    },
    message: String,
}, {
    timestamps: true,
})

const NoticeMessageModel = model<INoticeMessage>('NoticeMessage', NoticeMessage) as INoticeMessageModel;

export default NoticeMessageModel;