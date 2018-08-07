import { Schema, Model, Document, model } from "mongoose";
import { IUser } from "./User";
import { IPin } from "./Pin";
import { IBoard } from "./Board";

export interface IBoardSection extends Document {
    _id: string;
    user?: IUser;
    pin?: IPin[];
    board?: IBoard;
    theme?: string;
}

export interface IBoardSectionModel extends Model<IBoardSection> {

}

const BoardSection = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    pin: [{
        type: Schema.Types.ObjectId,
        ref: "pin",
    }],
    board: {
        type: Schema.Types.ObjectId,
        ref: "Board",
    },
    theme: String,
});

const BoardSectionModel = model<IBoardSection>("BoardSection", BoardSection) as IBoardSectionModel;

export default BoardSectionModel;