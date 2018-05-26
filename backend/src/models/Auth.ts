import { Schema, model, Document, Model } from 'mongoose';

export interface IAuth extends Document {
    username: string,
    email: string,
    profile: {
        displayName: string,
        thumbnail: string
    }
}

export interface IAuthModel extends Model<IAuth> {
    
}

const AuthSchema = new Schema({
    username: String,
    email: String,
    profile: {
        displayName: String,
        thumbnail: {
            type: String,
            defaultValue: 'https://avatars.io/platform/userId'
        }
    }
});

const AuthModel = model<IAuth>('Auth', AuthSchema) as IAuthModel;

export default AuthModel;