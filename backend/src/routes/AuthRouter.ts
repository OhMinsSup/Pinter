import { Request, Response, Router } from 'express';
import * as joi from 'joi';
import { generateToken, decodeToken } from '../lib/token';
import { sendMail } from '../lib/sendMail';
import Auth, { IAuth } from '../models/Auth';
import EmailAuth, { IEmailAuth } from '../models/EmailAuth';

class AuthRouter {
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
            const auth: IAuth = await Auth.findByEmailOrUsername('email', email);
            
            const emailKeywords = auth ? {
                type: 'email-login',
                text: '로그인',
            } : {
                type: 'register',
                text: '회원가입',
            }

            const verification: IEmailAuth = await EmailAuth.verificationEmail(email);
            
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

    private async register(req: Request, res: Response): Promise<any> {
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

        const {
            registerToken,
            displayName,
            username
        }: BodySchema = req.body;

        try {
            let decoded: any = await decodeToken(registerToken);
        
            if (!decoded) {
                return res.status(400).json({
                    name: 'INVALID_TOKEN'
                });
            }

            const { email } = decoded;

            const [emailExists, usernameExists] = await Promise.all([
                Auth.findByEmailOrUsername('email', email),
                Auth.findByEmailOrUsername('username', username)
            ]);

            if (emailExists || usernameExists) {
                res.status(409).json({
                    name: 'DUPLICATED_ACCOUNT',
                    payload: emailExists ? 'email' : 'username'
                });
                return;
            }

            const auth: IAuth = await Auth.createAuth(username, email, displayName);            

            const token: string = await auth.generate(auth);

            res.cookie('access_token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7
            });

            res.json({
                auth: {
                    id: auth._id,
                    username: auth.username,
                    displayName: auth.profile.displayName,
                    thumbnail: auth.profile.thumbnail
                },
                token
            });
        } catch(e) {
            res.status(500).json(e);
        }
    }

    private async login(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            code: string
        }
        const { code }: BodySchema = req.body;
        
        if (typeof code !== 'string') {
            return res.status(400);
        }

        try {
            const auth: IEmailAuth = await EmailAuth.findByCode(code);
            
            if (!auth) {
                return res.status(404);
            }

            const { email } = auth;            
            const auths: IAuth = await Auth.findByEmailOrUsername('email', email);

            if (!auths) {
                return res.status(401);
            }

            const token = await auths.generate(auths);

            res.cookie('access_token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7
            });

            res.json({
                auth: {
                    id: auths._id,
                    username: auths.username,
                    displayName: auths.profile.displayName,
                    thumbnail: auths.profile.thumbnail
                },
                token
            });

            await EmailAuth.findOneAndUpdate({ code: auth.code }, { $set: { logged: true } }, { 
                new: true        
            }).exec();
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async code(req: Request, res: Response): Promise<any> {
        type ParamsSchema = {
            code: string
        }
        const { code }: ParamsSchema = req.params;
        
        try {
            const auth: IEmailAuth = await EmailAuth.findByCode(code);
            
            if (!auth) {
                return res.status(404);
            }
            
            const { email } = auth;
            const registerToken: string = await generateToken({ email }, { expiresIn: '1h', subject: 'auth-register' });
            res.json({
                email,
                registerToken
            });
            
            await EmailAuth.findOneAndUpdate(auth.code, { $set: { logged: true } }, { 
                new: true        
            }).exec();
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    private async logout(req: Request, res: Response): Promise<any> {
        res.cookie('access_token', null, {
            httpOnly: true,
            maxAge: 0
        });
        return res.status(204);
    }

    private async check(req: Request, res: Response): Promise<any> {
        const user = req['user'];

        if (!user) {
            return res.status(401);
        }

        res.json({
            auth: user
        });

    }

    private async socialRegister(req: Request, res: Response): Promise<any> {
        res.json('테스트');

    }

    private async socialLogin(req: Request, res: Response): Promise<any> {
        res.json('테스트');

    }

    private async verifySocial(req: Request, res: Response): Promise<any> {
        res.json('테스트');

    }

    public routes() {
        const { router } = this;

        router.post('/send-auth-email', this.sendAuthEmail);
        router.post('/email-register', this.register);
        router.post('/email-login', this.login);
        router.post('/logout', this.logout);
        
        router.get('/code/:code', this.code);
        router.get('/check', this.check);
        
        router.post('/register/:provider(facebook|google)', this.socialRegister);
        router.post('/login/:provider(facebook|google)', this.socialLogin);
        router.post('/verify-social/:provider(facebook|google)', this.verifySocial);
    }
}

export default new AuthRouter().router;