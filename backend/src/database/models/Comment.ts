import { Schema, model, Document, Model } from "mongoose";
import { IUser } from "./User";
import { IPin } from "./Pin";

export interface IComment extends Document {
    _id: string;
    user?: IUser;
    pin?: IPin;
    has_tags?: IUser[];
    text?: string;
}

export interface ICommentModel extends Model<IComment> {
    readComment(commentId: string): Promise<any>;
    getCommentList(pinId: string): Promise<any>;
}

const Comment = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    pin: {
        type: Schema.Types.ObjectId,
        ref: "Pin",
        index: true,
    },
    has_tags: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    text: String,
}, {
    timestamps: true,
});

Comment.statics.readComment = function(commentId: string): Promise<any> {
    return this.findById(commentId)
    .populate("user")
    .populate({
        path: "has_tags",
        populate: [{
            path: "has_tags",
        }],
    })
    .lean();
};

Comment.statics.getCommentList = function(pinId: string): Promise<any> {
    const query = Object.assign(
        {},
        { pin: pinId },
    );

    return this.find(query)
    .populate("user")
    .populate({
        path: "has_tags",
        populate: [{
            path: "has_tags",
        }],
    })
    .sort({_id: -1})
    .lean();
};

const CommentModel = model<IComment>("Comment", Comment) as ICommentModel;

export default CommentModel;