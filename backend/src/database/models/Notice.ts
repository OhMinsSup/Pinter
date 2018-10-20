import { Schema, Model, model, Document } from 'mongoose';
import { IUser } from './User';

export interface INotice extends Document {
  _id: string;
  creator?: IUser;
  createdAt?: string;
  updatedAt?: string;
}

export interface INoticeModel extends Model<INotice> {}

const Notice = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const NoticeModel = model<INotice>('Notice', Notice) as INoticeModel;

export default NoticeModel;
