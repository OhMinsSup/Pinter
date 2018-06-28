import { Schema, model, Document, Model } from 'mongoose';
import { IAuth } from './Auth';
import { IPin } from './Pin';
import { IThema } from './Thema';

export interface IBoard extends Document {

}

export interface IBoardModel extends Model<IBoard> {

}

const BoardSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    },
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    },
    theme: {
        type: Schema.Types.ObjectId,
        ref: 'Theme'
    }
});

const BoardModel = model<IBoard>('Board', BoardSchema) as IBoardModel ;

export default BoardModel;