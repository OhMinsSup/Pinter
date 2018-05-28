import { Schema, model, Document, Model } from 'mongoose';
import * as shortid from 'shortid';

export interface IEmailAuth extends Document {
    _id: string
    code: string
    email: string
    logged: boolean
}

export interface IEmailAuthModel extends Model<IEmailAuth> {
    verificationEmail(email: string): Promise<any>
    findByCode(code: string): Promise<any>
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

EmailAuthSchema.statics.verificationEmail = function(email: string): Promise<any> {
    const emailAuth = new this({
        email: email
    });

    return emailAuth.save();
}

EmailAuthSchema.statics.findByCode = function(code: string): Promise<any> {    
    return this.findOne({
        code: code,
        logged: false
    });
}

const EmailAuthModel = model<IEmailAuth>('EmailAuth', EmailAuthSchema) as IEmailAuthModel;

export default EmailAuthModel;