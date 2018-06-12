import { Schema, model, Document, Model } from 'mongoose';
import { IAuth } from './Auth';
import { IPin } from './Pin';

export interface IBoard extends Document {
    _id: string;
    title: string,
    pin: IPin;
    user: IAuth;
}

export interface IBoardModel extends Model<IBoard> {
    createBoard(title: string, userId: string, pinId?: string): Promise<any>
}

const BoardSchema = new Schema({
    title: String,
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    },
}, { timestamps: true });

BoardSchema.statics.createBoard = function(title: string, userId: string, pinId?: string): Promise<any> {
    const board = new this({
        title: title,
        pin: pinId,
        user:userId     
    });

    return board.save();
}


const BoardModel = model<IBoard>('Board', BoardSchema) as IBoardModel;

export default BoardModel;

