import { Schema, model, Document, Model } from 'mongoose';
import { IAuth } from './Auth';
import { IBoard } from './Board';

export interface IPin extends Document {
    _id: string;
    title: string,
    description: string,
    url: string,
    imageUrl: string
    mimeType: string,
    imagename: string,
    user: IAuth;
    board: IBoard;
}

export interface IPinModel extends Model<IPin> {
    createPinImgUpload(
        title: string,
        description: string,
        imageUrl: string | Buffer,
        mimeType: string,
        imagename: string,
        userId: string,
        boardId?: string
    ): Promise<any>;
    createPinUrl(
        title: string,
        description: string,
        url: string,
        userId: string,
        boardId?: string
    ): Promise<any>;
}

const PinSchema = new Schema({
    title: String,
    description: String,
    url: String,
    imageUrl: String,
    mimeType: String,
    imagename: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    }
}, { timestamps: true });

PinSchema.statics.createPinImgUpload = function(
    title: string,
    description: string,
    imageUrl: string | Buffer,
    mimeType: string,
    imagename: string,
    userId: string,
    boardId?: string
): Promise<any> {
    const pin = new this({
        title: title,
        description: description,
        imageUrl: imageUrl,
        mimeType: mimeType,
        imagename: imagename,
        user: userId,
        board: boardId
    });

    return pin.save();
}

PinSchema.statics.createPinUrl = function(
    title: string,
    description: string,
    url: string,
    userId: string,
    boardId?: string
): Promise<any> {
        const pin = new this({
        title: title,
        description: description,
        url: url,
        user: userId,
        board: boardId
    });

    return pin.save();
}

const PinModel = model<IPin>('Pin', PinSchema) as IPinModel;

export default PinModel;

