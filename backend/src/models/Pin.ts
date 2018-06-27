import { Schema, model, Document, Model } from 'mongoose';
import { IAuth } from './Auth';

type querySchema = {
    user: string | void,
    cursor: string | void
}


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
    listPins({ user, cursor }: querySchema): Promise<any>
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

PinSchema.statics.listPins = function({ user, cursor }: querySchema): Promise<any> {
    const query = Object.assign(
        { },
        cursor ? { _id: { $lt: cursor } } : { },
        user ? { user } : { }
    );

    return this.find(query)
    .populate('user','profile')
    .sort({ _id: -1 })
    .limit(20)
    .exec();
}

const PinModel = model<IPin>('Pin', PinSchema) as IPinModel;

export default PinModel;

