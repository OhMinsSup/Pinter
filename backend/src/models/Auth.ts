import { Schema, model, Document, Model } from 'mongoose';
import { generateToken } from '../lib/token';

export interface IAuth extends Document {
    _id: string,
    username: string,
    email: string,
    profile: {
        displayName: string,
        thumbnail: string
    },
    generate(profile: any): Promise<any>
}

export interface IAuthModel extends Model<IAuth> {
    findByEmailOrUsername(type: 'email'|'username', value: string): Promise<any>
    createAuth(username: string, email: string, displayName: string): Promise<any>
}

const AuthSchema = new Schema({
    username: String,
    email: String,
    profile: {
        displayName: String,
        thumbnail: {
            type: String,
            default: 'https://avatars.io/platform/userId'
        }
    }
});

AuthSchema.statics.findByEmailOrUsername = function(type: 'email'|'username', value: string): Promise<any> {
    return this.findOne({
        [type]: value
    });
}

AuthSchema.statics.createAuth = function(username: string, email: string, displayName: string): Promise<any> {
    const auth = new this({
        username: username,
        email: email,
        profile: {
            displayName: displayName
        }
    });

    return auth.save();
}

type ProfileTypes = {
    profile: {
        displayName: string,
        thumbnail: string
    }
}

AuthSchema.methods.generate = async function(profile: any): Promise<any> {
    const { _id, username } = this;

    if (!profile) {
        throw new Error('user profile not found');
    }

    const { profile: { displayName, thumbnail } }:ProfileTypes = profile;
    
    const auth = {
        _id,
        username,
        displayName,
        thumbnail
    };

    return generateToken(auth);
}

const AuthModel = model<IAuth>('Auth', AuthSchema) as IAuthModel;

export default AuthModel;