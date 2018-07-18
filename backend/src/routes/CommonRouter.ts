import { Request, Response, Router } from 'express';

class CommonRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        const { router } = this;

    }
}

export default new CommonRouter().router;