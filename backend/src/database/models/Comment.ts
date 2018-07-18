import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from './User';
import { IPin } from './Pin';

export interface IComment extends Document {
    _id: string;
    user?: IUser;
    pin?: IPin;
    text?: string,
}

export interface ICommentModel extends Model<IComment> {
}

const Comment = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    },
    text: String,
}, {
    timestamps: true
});

const CommentModel = model<IComment>('Comment', Comment) as ICommentModel;

export default CommentModel;