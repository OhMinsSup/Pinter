import { Request, Response, Router } from 'express';
import * as joi from 'joi';
import Board from '../database/models/Board';
import needAuth from '../lib/middleware/needAuth';

class BoardRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async createBoard(req: Request, res: Response): Promise<any> {

    }

    public routes(): void {
        const { router } = this;

        router.post('/', needAuth, this.createBoard);
    }
}

export default new BoardRouter().router;