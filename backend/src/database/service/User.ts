import User from '../models/User';
import EmailAuth from '../models/EmailAuth';
import sequelize from '../db'; 
import UserProfile, { IUserProfile } from '../models/UserProfile';
import { generateToken } from '../../lib/token';

function findByEmailOrUsername(type: 'email' | 'username', value: string) {
    return User.findOne({
        where: {
            [type]: value
        }
    })
};

function findCode(code: string) {
    return EmailAuth.findOne({
        where: {
            code,
            logged: false
        }
    });
}

function use(code: string) {
    const rowQuery = `update email_auth set logged = true from (select code from email_auth) as e where e.code='${code}';`
    return sequelize.query(rowQuery);
}

function getProfile(id: string) {
    return UserProfile.findOne({
        where: {
            fk_user_id: id
        }
    });
}

type TokenPayload = {
    id: string,
    username: string
};

async function generate(token: TokenPayload) {
    const profile: IUserProfile = await UserProfile.findOne({
        where: {
            fk_user_id: token.id
        }
    });
    
   if (!profile) {
        throw new Error('유저 프로필을 찾을 수 없다');
    }    
    
    const { id, display_name: displayName, thumbnail } = profile;
    const user = {
        id,
        username: token.username,
        displayName,
        thumbnail
    };    
    return generateToken(user);
}

export {
    findByEmailOrUsername,
    findCode,
    use,
    generate,
    getProfile
};