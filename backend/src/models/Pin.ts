import { Schema, model, Document, Model } from 'mongoose';
import { IAuth } from './Auth';

export interface IPin extends Document {
    _id: string;
    user: IAuth,
    title: string,
    description: string,
    url: string,
    filename: string,
    filesize: number,
    filepath: string
}

export interface IPinModel extends Model<IPin> {

}

const PinSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    },
    title: String,
    description: String,
    url: String,
    filename: String,
    filesize: Number,
    filepath: String
}, { 
    timestamps: true 
});

const PinModel = model<IPin>('Pin', PinSchema) as IPinModel;

export default PinModel;

