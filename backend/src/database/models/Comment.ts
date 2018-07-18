import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from './User';
import { IPin } from './Pin';

export interface IComment extends Document {
    _id: string;
    user?: IUser;
    pin?: IPin;
    has_tags?: Array<IUser>;
    text?: string,
}

export interface ICommentModel extends Model<IComment> {
    readComment(commentId: string): Promise<any>;
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
    has_tags: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    text: String,
}, {
    timestamps: true
});

Comment.statics.readComment = function(commentId: string): Promise<any> {
    return this.findById(commentId)
    .populate('user')
    .populate({
        path: 'has_tags',
        populate: [{
            path: 'has_tags'
        }]
    })
};

const CommentModel = model<IComment>('Comment', Comment) as ICommentModel;

export default CommentModel;