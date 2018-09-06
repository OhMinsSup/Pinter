import { Schema, model, Document, Model } from "mongoose";
import * as shortid from "shortid";

export interface IEmailAuth extends Document {
    _id: string;
    code?: string;
    email?: string;
    logged?: boolean;
}

export interface IEmailAuthModel extends Model<IEmailAuth> {
    findCode(code: string): Promise<any>;
    use(code: string): Promise<any>;
}

const EmailAuth = new Schema({
    code: {
        type: String,
        unique: true,
        default: shortid.generate,
    },
    email: String,
    logged: {
        type: Boolean,
        default: false,
    },
}, {
    autoIndex: true,
});

EmailAuth.statics.findCode = function(code: string): Promise<any> {
    return this.findOne({
        code,
        logged: false,
    })
    .lean();
};

EmailAuth.statics.use = function(code: string): Promise<any> {
    return this.findOneAndUpdate(code, { 
        $set: { 
            logged: true, 
        },
    }, {  new: true })
    .lean();
};

const EmailAuthModel = model<IEmailAuth>("EmailAuth", EmailAuth) as IEmailAuthModel;

export default EmailAuthModel;