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
    social: {
        facebook: {
            id: string,
            accessToken: string
        },
        google: {
            id: string,
            accessToken: string
        }
    },
    generate(profile: any): Promise<any>
}

export interface IAuthModel extends Model<IAuth> {
    findByEmailOrUsername(type: 'email'|'username', value: string): Promise<any>
    createAuth(username: string, email: string, displayName: string): Promise<any>
    findBySocialId(provider: string, socialId: string | number): Promise<any>
    createSocialAuth(
        provider: string,
        accessToken: string,
        username: string,
        email: string,
        socialId: string | number,
        thumbnail: string,
        displayName: string
    ): Promise<any>
    socialLogin(provider: string, socialId: string | number, accessToken: string): Promise<any>
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
    },
    social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        }
    },
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

AuthSchema.statics.socialLogin = function(socialId: string | number, provider: string, accessToken: string): Promise<any> {
    const auth = new this({
        social: {
            [provider]: {
                id: socialId,
                accessToken: accessToken
            },
        },
    });

    return auth.save();
}

AuthSchema.statics.findBySocialId = function(provider: string, socialId: string | number): Promise<any> {
    const key = `social.${provider}.id`;

    return this.findOne({
        [key]: socialId
    });
}

AuthSchema.statics.createSocialAuth = function(
    provider: string,
    accessToken: string,
    username: string,
    email: string,
    socialId: string | number,
    thumbnail: string,
    displayName: string
): Promise<any> {
    const auth = new this({
        username: username,
        email: email,
        profile: {
            displayName: displayName,
            thumbnail: thumbnail
        },
        social: {
            [provider]: {
                id: socialId,
                accessToken: accessToken
            },
        },
    });

    return auth.save();
}

AuthSchema.methods.generate = async function(profile: any): Promise<any> {
    interface ProfileTypes {
        profile: {
            displayName: string;
            thumbnail: string;
        }
    }
 
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