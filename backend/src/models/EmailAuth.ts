import { Schema, model, Document, Model } from 'mongoose';
import * as shortid from 'shortid';

export interface IEmailAuth extends Document {
    code: string
    email: string,
    logged: boolean
}

export interface IEmailAuthModel extends Model<IEmailAuth> {
    
}

const EmailAuthSchema = new Schema({
    code: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    email: String,
    logged: {
        type: Boolean,
        default: false
    }
});

const EmailAuthModel = model<IEmailAuth>('EmailAuth', EmailAuthSchema) as IEmailAuthModel;

export default EmailAuthModel;