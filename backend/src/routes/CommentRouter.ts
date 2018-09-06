import { Request, Response, Router } from 'express';
import * as joi from 'joi';
import Comment, { IComment } from '../database/models/Comment';
import User from '../database/models/User';
import Pin from '../database/models/Pin';
import needAuth from '../lib/middleware/needAuth';
import {
    checkPinExistancy,
} from '../lib/common';
import {
    serializeComment,
} from '../lib/serialize';

class CommentRouter {
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    private async writeComment(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            text: string;
            tags: string[];
        };

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
            const tagUserNames = await Promise.all(tags.map(tag => User.findOne({ 'profile.displayName': tag }).select('_id').lean()));
            const tagIds = tagUserNames.map(id => id).filter(e => e);
            
            const comment = await Comment.create({ 
                pin: pinId, 
                user: userId, 
                text,
                has_tags: tagIds,
            });
            
            if (!comment) {
                return res.status(500);
            }

            await Pin.comment(pinId);
            const commentWithData = await Comment.readComment(comment._id);
            res.json(serializeComment(commentWithData));
        } catch (e) {
            res.status(500).json(e);
        }
    }
    
    private async deleteComment(req: Request, res: Response): Promise<any> {
        // comment id vlaue
        const { commentId } = req.params;
        const pinId: string = req['pin']._id;

        try {
            const comment = await Comment.findById(commentId).lean();

            if (!comment) {
                return res.status(404).json({
                    name: '존재하지않는 댓글은 삭제할 수 없습니다.',
                });
            }

            await Pin.uncomment(pinId);
            comment.remove();
            res.status(204);
        } catch (e) {
            res.status(500).json(e);
        }

    }

    private async getCommentList(req: Request, res: Response): Promise<any>  {
        const pinId: string = req['pin']._id;

        try {
            const comment: IComment[] = await Comment.getCommentList(pinId);
            const commentWithData = comment.map(serializeComment);
            res.json({
                commentWithData,
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    public routes(): void {
        const { router } = this;

        router.post('/:id', needAuth, checkPinExistancy, this.writeComment);
        router.delete('/:id/:commentId', needAuth, checkPinExistancy, this.deleteComment);
        router.get('/:id', needAuth, checkPinExistancy, this.getCommentList);
    }
}

export default new CommentRouter().router;