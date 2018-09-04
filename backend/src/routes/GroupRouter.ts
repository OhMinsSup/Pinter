import { Request, Response, Router } from 'express';

class GroupRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async createGroup(req: Request, res: Response): Promise<any> {
        console.log('dsd');
    }

    public routes(): void {
        const { router } = this;

        router.post('/', this.createGroup);
    }
}

export default new GroupRouter().router;