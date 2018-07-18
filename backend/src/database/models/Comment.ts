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
    getCommentList(pinId: string, cursor?: string): Promise<any>;
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

Comment.statics.getCommentList = function(pinId: string, cursor?: string): Promise<any> {
    const query = Object.assign(
        {},
        cursor ? { _id: { $lt: cursor }, pin: pinId } : { pin: pinId }
    );

    return this.find(query)
    .populate('user')
    .populate({
        path: 'has_tags',
        populate: [{
            path: 'has_tags'
        }]
    })
    .sort({_id: -1}) 
    .limit(10); 
}

const CommentModel = model<IComment>('Comment', Comment) as ICommentModel;

export default CommentModel;