import { Schema, model, Document, Model } from "mongoose";
import { IUser } from "./User";
import { IPin } from "./Pin";

export const defaultThumbnail: string = 'https://cascade-herb.com/wp-content/uploads/2018/06/default-thumbnail.png';

export interface IBoard extends Document {
    _id: string;
    creator?: IUser;
    user?: IUser[];
    pin?: IPin[];
    theme?: string;
    description?: string;
    cover?: string;
}

export interface IBoardModel extends Model<IBoard> {
    readBoardById(boardId: string): Promise<any>;
}

const Board = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    pin: [{
        type: Schema.Types.ObjectId,
        ref: "Pin",
    }],
    theme: String,
    description: String,
    cover: {
        type: String,
        default: defaultThumbnail,
    },
});

Board.statics.readBoardById = function(boardId: string): Promise<any> {
    return this.findById(boardId)
    .populate("creator")
    .populate({
        path: "user",
        populate: [{
            path: "user",
        }],
    })
    .populate({
        path: "pin",
        populate: [{
            path: "pin",
        }],
    });
};

const BoardModel = model<IBoard>("Board", Board) as IBoardModel;

export default BoardModel;