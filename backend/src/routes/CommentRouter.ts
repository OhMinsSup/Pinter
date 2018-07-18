import { Request, Response, Router } from 'express';
import * as joi from 'joi';
import Comment from '../database/models/Comment';
import User, { IUser } from '../database/models/User';
import needAuth from '../lib/middleware/needAuth';
import {
    checkPinExistancy
} from '../lib/common';

class CommentRouter {
    public router: Router;
    
    constructor() {
        this.router = Router();
    }

    private async writeComment(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            text: string;
            tags: Array<string>;
        }

        const schema = joi.object().keys({
            text: joi.string(),
            tags: joi.array().items(joi.string()).required(),
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        const { text, tags }: BodySchema = req.body;
        const pinId: string = req['pin']._id;
        const userId: string = req['user']._id;

        try {
            const tagUserNames = await Promise.all(tags.map(tag => User.findOne(tag).select('_id')));
            const comment = await Comment.create({ 
                pin: pinId, 
                user: userId, 
                text: text,
                has_tags: tagUserNames 
            });

            if (!comment) {
                return res.status(500);
            }

            const commentWithData = await Comment.readComment(comment._id);
            res.json(commentWithData);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async test(req: Request, res: Response): Promise<any>  {

    }

    public routes(): void {
        const { router } = this;

        router.post('/:id', needAuth, checkPinExistancy, this.writeComment);
    }
}

export default new CommentRouter().router;