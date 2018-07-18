import { Request, Response, Router } from 'express';

class BoardRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        const { router } = this;

    }
}

export default new BoardRouter().router;