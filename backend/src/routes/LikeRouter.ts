import { Request, Response, Router } from 'express';
import Pin from '../database/models/Pin';
import Like, { ILike } from '../database/models/Like';
import { IUser } from '../database/models/User';
import needAuth from '../lib/middleware/needAuth';
import { checkPinExistancy } from '../lib/common';
import {
    serializeUser
} from '../lib/serialize';

class LikeRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async likeList(req: Request, res: Response): Promise<any> {
        const pinId: string = req['pin']._id;
        const userId: string = req['user']._id;

        try {
            const user: Array<ILike> = await Like.getLikeUserList(pinId, userId);            
            const usersWithData = user.map(serializeUser);
            res.json({
                usersWithData
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async getLike(req: Request, res: Response): Promise<any> {
        const pinId: string = req['pin']._id;
        const userId: string = req['user']._id;

        let liked = false;
        if (userId) {
            const exists = await Like.checkExists(userId, pinId);
            liked = !!exists;
        }
        try {
            const pin = await Pin.findById(pinId);

            res.json({
                liked,
                likes: pin.likes
            })   
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async likePin(req: Request, res: Response): Promise<any> {
        const pinId: string = req['pin']._id;
        const userId: string = req['user']._id;

        try {
            const exists: ILike = await Like.checkExists(userId, pinId);

            if (exists) {
                return res.status(409).json({
                    name: '이미 like 중입니다'
                });
            }

            await Like.create({
                user: userId,
                pin: pinId
            });
            await Pin.like(pinId);
            const pin = await Pin.findById(pinId);
            res.json({
                liked: true,
                likes: pin.likes
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async unlikePin(req: Request, res: Response): Promise<any> {
        const pinId: string = req['pin']._id;
        const userId: string = req['user']._id;

        const exists: ILike = await Like.checkExists(userId, pinId);

        if (!exists) {
            return res.status(409).json({
                name: 'like를 하지 않았습니다'
            });
        }

        await exists.remove();
        await Pin.unlike(pinId);
        const pin = await Pin.findById(pinId);
        res.json({
            liked: false,
            likes: pin.likes
        });
    }

    public routes(): void {
        const { router } = this;
        
        router.get('/:id/list', needAuth, checkPinExistancy, this.likeList);
        router.get('/:id', needAuth, checkPinExistancy, this.getLike);
        router.post('/:id', needAuth, checkPinExistancy, this.likePin);
        router.delete('/:id', needAuth, checkPinExistancy, this.unlikePin);
    }
}

export default new LikeRouter().router;