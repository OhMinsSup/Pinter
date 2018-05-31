import { Schema, model, Document, Model } from 'mongoose';

export interface IPin extends Document {
    _id: string,
    user: string,
    board: string,
    description: string,
    siteUrl: string,
    imageUrl: string,
    imageSize: number
}

export interface IPinModel extends Model<IPin> {

}

const PinSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    },
    description: String,
    siteUrl: String,
    imageUrl: String,
    imageSize: Number
}, {
    timestamps: true
});

const PinModel = model<IPin>('Pin', PinSchema) as IPinModel;

export default PinModel;