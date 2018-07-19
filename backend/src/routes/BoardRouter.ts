import { Request, Response, Router } from 'express';
import * as joi from 'joi';
import Board from '../database/models/Board';
import needAuth from '../lib/middleware/needAuth';
import {
    serializeBoard
} from '../lib/serialize';

class BoardRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async createBoard(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            theme: string;
        }
        const schema = joi.object().keys({
            theme: joi.string()
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        const { theme }: BodySchema = req.body;
        const userId: string = req['user']._id;

        try {
            const board = await Board.create({ user: userId, theme: theme });
            const boardData = await Board.readBoardById(board._id);
            const serialized = serializeBoard(boardData);  

            res.json(serialized);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    public routes(): void {
        const { router } = this;

        router.post('/', needAuth, this.createBoard);
    }
}

export default new BoardRouter().router;