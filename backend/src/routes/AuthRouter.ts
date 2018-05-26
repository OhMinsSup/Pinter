import { Request, Response, Router } from 'express';

class AuthRouter {
    public router: Router

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async sendAuthEmail(req: Request, res: Response): Promise<any> {
        res.json('테스트');
    }

    private async register(req: Request, res: Response): Promise<any> {
        res.json('테스트');

    }

    private async login(req: Request, res: Response): Promise<any> {
        res.json('테스트');

    }

    private async code(req: Request, res: Response): Promise<any> {
        res.json('테스트');

    }

    private async logout(req: Request, res: Response): Promise<any> {
        res.json('테스트');

    }

    private async check(req: Request, res: Response): Promise<any> {
        res.json('테스트');

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