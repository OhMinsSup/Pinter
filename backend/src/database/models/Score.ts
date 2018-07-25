import { Schema, model, Model, Document } from 'mongoose';

export const Types = {
    LIKE: 'LIKE',
    COMMENT: 'COMMENT',
    LOCKER: 'LOCKER',
    READ: 'READ'
};

export interface IScore extends Document {
    _id: string;
}

export interface ISocreModel extends Model<IScore> { }

const Score = new Schema({

});

const ScoreModel = model<IScore>('Score', Score) as ISocreModel;

export default ScoreModel;