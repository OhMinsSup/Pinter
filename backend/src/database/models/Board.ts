import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from './User';
import { IPin } from './Pin';

export interface IBoard extends Document {
    _id: string;
    user?: IUser;
    pin?: IPin;
    theme?: string;
}

export interface IBoardModel extends Model<IBoard> {
    readBoardById(boardId: string): Promise<any>;
}

const Board = new Schema({
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    pin: [{
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    }],
    theme: String
});

Board.statics.readBoardById = function(boardId: string): Promise<any> {
    return this.findById(boardId).populate('user');
}

const BoardModel = model<IBoard>('Board', Board) as IBoardModel;

export default BoardModel;