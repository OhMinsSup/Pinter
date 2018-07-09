import { Request, Response, Router } from 'express';
import * as joi from 'joi';
import User, { IUser } from '../database/models/User';
import EmailAuth, { IEmailAuth } from '../database/models/EmailAuth';
import UserProfile, { IUserProfile } from '../database/models/UserProfile';
import SocailProfile, { ISocialProfile } from '../database/models/SocialProfile';
import { sendMail } from '../lib/sendMail';
import { generateToken, decodeToken } from '../lib/token';
import { findByEmailOrUsername, findCode, use, generate, getProfile } from '../database/service/User';
import getSocialProfile, { Profile } from '../lib/social';

class Auth {
    public router: Router

    constructor() {
        this.router = Router();
        this.routes();
    }
    private async sendAuthEmail(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            email: string
        }

        const schema = joi.object().keys({
            email: joi.string().email().required()
        });
        
        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        try {
            const { email }: BodySchema = req.body;
            const auth: IUser = await findByEmailOrUsername('email', email);
            const emailKeywords = auth ? {
                type: 'email-login',
                text: '로그인'
            } : {
                type: 'email-register',
                text: '회원가입'
            };

            const verification = await EmailAuth.build({
                email
            }).save();

            await sendMail({
                to: email,
                from: 'veloss <verification@gmail.com>',
                subject: `veloss ${emailKeywords.text}`,
                html: `
                <div style="max-width: 100%; width: 400px; margin: 0 auto; padding: 1rem; text-align: justify; background: #f8f9fa; border: 1px solid #dee2e6; box-sizing: border-box; border-radius: 4px; color: #868e96; margin-top: 0.5rem; box-sizing: border-box;">
                    <b style="black">안녕하세요! </b> ${emailKeywords.text}을 계속하시려면 하단의 링크를 클릭하세요. 만약에 실수로 요청하셨거나, 본인이 요청하지 않았다면, 이 메일을 무시하세요.
                </div>
                <a href="http://localhost:3000/${emailKeywords.type}?code=${verification.code}" style="text-decoration: none; width: 400px; text-align:center; display:block; margin: 0 auto; margin-top: 1rem; background: #845ef7; padding-top: 1rem; color: white; font-size: 1.25rem; padding-bottom: 1rem; font-weight: 600; border-radius: 4px;">계속하기</a>
                <div style="text-align: center; margin-top: 1rem; color: #868e96; font-size: 0.85rem;"><div>위 버튼을 클릭하시거나, 다음 링크를 열으세요: <br/> <a style="color: #b197fc;" href="http://localhost:3000/${emailKeywords.type}?code=${verification.code}">http://localhost:3000/${emailKeywords.type}?code=${verification.code}</a></div><br/><div>이 링크는 24시간동안 유효합니다. </div></div>`
            });

            res.json({
                isUser: !!auth
            })
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async code(req: Request, res: Response) {
        const { code } = req.params;

        try {
            const auth: IEmailAuth = await findCode(code);

            if (!auth) return res.status(404);
    
            const { email, code: emailCode } = auth;
            const registerToken: string = await generateToken({ email }, { expiresIn: '1h', subject: 'auth-register' })
            await use(emailCode);

            res.json({
                email,
                registerToken
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async localRegister(req: Request, res: Response) {
        type BodySchema = {
            registerToken: string,
            displayName: string,
            username: string
        }

        const schema = joi.object().keys({
            registerToken: joi.string().required(),
            displayName: joi.string().min(1).max(40),
            username: joi.string().min(3).max(16).required()
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }
        const { registerToken, username, displayName }: BodySchema = req.body;

        try {
            let decoded = await decodeToken(registerToken);

            if (!decoded) {
                return res.status(400).json({
                    name: '토큰 발급 안됨'
                });
            }

            const { email } = decoded;

            const [emailExists, usernameExists]: Array<IUser> = await Promise.all([
                findByEmailOrUsername('email', email),
                findByEmailOrUsername('username', username)
            ]);

            if (emailExists || usernameExists) {
                res.status(409).json({
                    name: '중복된 계정',
                    payload: emailExists ? 'email' : 'username'
                });
                return;
            }

            // TODO: 썸네일 지정
            const auth: IUser = await User.build({
                username,
                email
            }).save();

            await UserProfile.build({
                fk_user_id: auth.id,
                display_name: displayName
            }).save();


            const token: string = await generate(auth);

            res.cookie('access_token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7
            });

            res.json({
                user: {
                    id: auth.id,
                    username: auth.username,
                    displayName
                },
                token
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async localLogin(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            code: string
        }

        const { code }: BodySchema = req.body;

        if (typeof code !== 'string') {
            return res.status(400);
        }

        try {
            const auth: IEmailAuth = await findCode(code);

            if(!auth) {
                return res.status(404);
            }

            const { email } = auth;
            const user: IUser = await findByEmailOrUsername('email', email);

            if (!user) {
                return res.status(401);
            }

            const token: string = await generate(user);
            const profile: IUserProfile = await getProfile(user.id);
            res.cookie('access_token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7
            });

            res.json({
                user: {
                    id: user.id,
                    username: user.username,
                    displayName: profile.display_name,
                    thumbnail: profile.thumbnail
                },
                token
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }
    
    private async check(req: Request, res: Response): Promise<any> {
        const user = req['user'];
        if (!user) {
            return res.status(401);
        }
        res.json({
            user
        });
    }

    private async logout(res: Response): Promise<any> {
        res.cookie('access_token', null, {
            httpOnly: true,
            maxAge: 0
        });
        return res.status(204);
    }


    private async socialRegister (req: Request, res: Response): Promise<any> {
        type BodySchema = {
            socialEmail: string,
            accessToken: string,
            displayName: string,
            username: string
        }

        const schema = joi.object().keys({
            socialEmail: joi.string().email(),
            accessToken: joi.string().required(),
            displayName: joi.string().min(1).max(40),
            username: joi.string().min(3).max(16).required()
        });

        const result = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }
        
        const { provider } = req.params;
        const { socialEmail, displayName, username, accessToken }: BodySchema = req.body;

        let profile: Profile = null;

        try {
            profile = await getSocialProfile(provider, accessToken);
        } catch (e) {
            res.status(500).json(e);
        }

        const { id: socialId, thumbnail, email } = profile;

        try {
            const [emailExists, usernameExists]: Array<IUser> = await Promise.all([
                findByEmailOrUsername('email', email),
                findByEmailOrUsername('username', username)
            ]);

            if (emailExists || usernameExists) {
                res.status(409).json({
                    name: '중복된 계정',
                    payload: emailExists ? 'email' : 'username'
                });
                return;
            }

            const socialExists: ISocialProfile = await SocailProfile.findOne({
                include: [
                    {
                        model: User
                    }
                ],
                where: {
                    social_id: socialId
                }
            });

            if (socialExists) {
                return res.status(409).json({
                    name: '이미 가입한 소셜 계정'
                });
            }

            const user: IUser = await User.build({
                username,
                email: email || socialEmail
            }).save();
            // TODO: 썸네일 지정

            await UserProfile.build({

            }).save();

            await SocailProfile.build({
                fk_user_id: user.id,
                social_id: socialId,
                provider,
                access_token: accessToken 
            }).save();

            const profile = await UserProfile.findOne({
                where: {
                    fk_user_id: user.id
                }
            });

            const token: string = await generate(user);

            res.cookie('access_token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7
            });

            res.json({
                user: {
                    id: user.id,
                    username: user.username,
                    displayName,
                    thumbnail: profile.thumbnail
                },
                token
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async socialLogin(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            accessToken: string
        }

        const { accessToken }: BodySchema = req.body;
        const { provider } = req.params;

        let profile: Profile = null;

        try {
            profile = await getSocialProfile(provider, accessToken);
        } catch (e) {
            res.status(500).json(e);
        }

        if (!profile) {
            return res.status(401).json({
                name: '프로필이 존재하지 않습니다.'
            });
        }

        const socialId = profile.id;

        try {
            let user: ISocialProfile | IUser = await SocailProfile.findOne({
                include: [
                    {
                        model: User
                    }
                ],
                where: {
                    social_id: socialId
                }
            }).then(user => (user ? user.user : null));

            if (!user) {
                user = await findByEmailOrUsername('email', profile.email);
                if (!user) {
                    return res.status(401).json({
                        name: '등록되어 있지 않습니다.'
                    });
                }
                await SocailProfile.build({
                    fk_user_id: user.id,
                    social_id: socialId,
                    provider,
                    access_token: accessToken
                }).save();
            }

            const userProfile: IUserProfile = await UserProfile.findOne({
                where: {
                    fk_user_id: user.id
                }
            });

            const token: string = await generate(user);

            res.cookie('access_token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7
            });

            res.json({
                user: {
                    id: user.id,
                    username: user.username,
                    displayName: userProfile.display_name,
                    thumbnail: userProfile.thumbnail
                },
                token
            })
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async verifySocial(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            accessToken: string
        }

        const { accessToken }: BodySchema = req.body;
        const { provider } = req.params;

        let profile: Profile = null;

        try {
            profile = await getSocialProfile(provider, accessToken);
        } catch (e) {
            res.status(500).json(e);
        }

        if (!profile) {
            return res.status(401).json({
                name: '프로필이 존재하지 않습니다.'
            });
        }

        try {
            const [socialAuth, user]: Array<IUser | ISocialProfile> = await Promise.all([
                SocailProfile.findOne({
                    include: [
                        {
                            model: User
                        }
                    ],
                    where: {
                        social_id: profile.id
                    }
                }).then(user => (user ? user.user : null)),
                findByEmailOrUsername('email', profile.email),
            ]);

            res.json({
                profile,
                exists: !!(socialAuth || user)
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    public routes(): void {
        const { router } = this;

        router.post('/send-auth-email', this.sendAuthEmail);
        router.post('/email-register', this.localRegister);
        router.post('/email-login', this.localLogin);
        router.get('/code/:code', this.code);

        router.post('/logout', this.logout);
        router.get('/check', this.check);

        router.post('/register/:provider(facebook|google)', this.socialRegister);
        router.post('/login/:provider(facebook|google)', this.socialLogin);
        router.post('/verify-social/:provider(facebook|google)', this.verifySocial);
    }
}

export default new Auth().router;