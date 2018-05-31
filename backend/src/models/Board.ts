import { Schema, model, Document, Model } from 'mongoose';

export interface IBoard extends Document {
    _id: string,
    user: string,
    title: string
}

export interface IBoardModel extends Model<IBoard> {

}

const BoardSchema = new Schema({
    title: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    },
}, {
    timestamps: true
});

const BoardModel = model<IBoard>('Board', BoardSchema) as IBoardModel;

export default BoardModel;