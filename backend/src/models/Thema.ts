import { Schema, model, Document, Model, Types } from 'mongoose';
import { IPin } from './Pin';

export interface IThema extends Document {
    _id: string,
    theme: string,
    pin: IPin
}

export interface IThemaModel extends Model<IThema> {
}

const ThemaSchema = new Schema({
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    },
    thema: String,
});

const ThemaModel = model<IThema>('Thema', ThemaSchema) as IThemaModel ;

export default ThemaModel;