import { Request, Response, Router } from 'express';
import * as joi from 'joi';
import Board, { IBoard, defaultThumbnail } from '../database/models/Board';
import needAuth from '../lib/middleware/needAuth';
import { checkBoardExistancy } from '../lib/common';
import { serializeBoard } from '../lib/serialize';

class BoardRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async getBoard(req: Request, res: Response): Promise<any> {
        console.log('');
    }

    private async listBoard(req: Request, res: Response): Promise<any> {
        console.log('e');
    }

    private async WrtieBoard(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            theme: string,
        };
        
        const schema = joi.object().keys({
            theme: joi.any(),
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        const { theme }: BodySchema = req.body;
        const { pinId, boardId } = req.query;
        const userId: string = req['user']._id;
        let board: IBoard | null = null;

        try {
            if (!pinId && !boardId) {
                board = await Board.create({
                    creator: userId,
                    theme,
                });

                return res.json({
                    boardId: board._id,
                });
            } 

            const boardExists = await Board.findById(boardId);

            if (!boardExists) {
                return res.status(404).json({
                    name: 'board가 생성되지 않았습니다',
                });
            }

            board = await Board.findByIdAndUpdate(boardExists._id, {
                $pop: { pin: pinId },
            }, { new: true });

            res.json({
                boardId: board._id,
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async updateBoard(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            theme?: string,
            description?: string,
            cover?: string,
        };

        const schema = joi.object().keys({
            theme: joi.any(),
            description: joi.any(),
            cover: joi.any(),
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        const { theme, description, cover }: BodySchema = req.body;
        const boardId: string = req["board"]._id;

        const query = Object.assign(
            {},
            theme ? theme : '',
            description ? description : '',
            cover ? cover : defaultThumbnail,
        );

        try {
            const board = await Board.findByIdAndUpdate(boardId, query, { new: true });

            const boardData = await Board.readBoardById(board._id);
            const serialized = serializeBoard(boardData);
            res.json(serialized);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async deleteBoard(req: Request, res: Response): Promise<any> {
        const boardId: string = req["board"]._id;
        
        try {
            await Board.deleteOne({
                _id: boardId,
            });

            res.status(204).json({
                board: true,
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async getBoardInfo(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        
        try {
            const board = await Board.findById(id);

            res.json({
                boardId: board._id,
                creator: board.creator,
                theme: board.theme,
                description: board.description,
                cover: board.cover,
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async themeBoardList(req: Request, res: Response): Promise<any> {
        const userId: string = req['user']._id;
        
        try {
            const themes = await Board.find({
                creator: userId,
            })
            .select('theme')
            .select('cover');
            
            res.json({
                themes,
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    public routes(): void {
        const { router } = this;

        router.get('/:id', needAuth, this.getBoardInfo);
        router.get('/themes', needAuth, this.themeBoardList);
        router.post('/', needAuth, this.WrtieBoard);
        router.put('/:id', needAuth, checkBoardExistancy, this.updateBoard);
        router.delete('/:id', needAuth, checkBoardExistancy, this.deleteBoard);
    }
}

export default new BoardRouter().router;