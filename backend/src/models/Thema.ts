import { Schema, model, Document, Model } from 'mongoose';
import { IPin } from './Pin';

export interface IThema extends Document {
    theme: string,
    pin: IPin
}

export interface IThemaModel extends Model<IThema> {
    findByPin(pinId: string): Promise<any>
}

const ThemaSchema = new Schema({
    pin: {
        type: Schema.Types.ObjectId,
        ref: 'Pin'
    },
    thema: String,
});

ThemaSchema.statics.findByPin = function(pinId: string): Promise<any> {
    return this.findOne({
        pin: pinId
    });
} 

const ThemaModel = model<IThema>('Thema', ThemaSchema) as IThemaModel ;

export default ThemaModel;