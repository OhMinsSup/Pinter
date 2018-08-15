import { Request, Response, Router } from 'express';
import needAuth from '../lib/middleware/needAuth';
import { checkPinExistancy } from '../lib/common';
import {
    serializeUser, serializeLocker,
} from '../lib/serialize';

import PinLocker, { IPinLocker } from '../database/models/PinLocker';
import UserModel, { IUser } from '../database/models/User';

class LockerRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async getLockerList(req: Request, res: Response): Promise<any> {
        const pinId: string = req['pin']._id;
        const userId: string = req['user']._id;

        try {
            const user: IPinLocker[] = await PinLocker.getLockerUserList(pinId, userId);            
            const usersWithData = user.map(serializeUser);
            res.json({
                usersWithData,
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async createLockerPin(req: Request, res: Response): Promise<any> {
        const userId: string = req['user']._id;
        const pinId: string = req['pin']._id;

        try {
            const exists: IPinLocker = await PinLocker.checkExists(userId, pinId);

            if (exists) {
                return res.status(409).json({
                    name: '이미 보관중입니다',
                });
            }

            const locker = await PinLocker.create({ user: userId, pin: pinId });
            await PinLocker.lockerCount(locker._id);
            res.json({
                locker: !!locker,
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async deleteLockerPin(req: Request, res: Response): Promise<any> {
        const userId: string = req['user']._id;
        const pinId: string = req['pin']._id;

        try {
            const exists: IPinLocker = await PinLocker.checkExists(userId, pinId);
            
            if (!exists) {
                return res.status(409).json({
                    name: '보관하지 않은 핀입니다.',
                });
            }

            await PinLocker.lockerUnCount(exists._id);
            await exists.remove();
            res.status(204).json({
                locker: true,
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async lockerList(req: Request, res: Response): Promise<any> {
        const { cursor } = req.query;
        const { displayName } = req.params;
    
        try {
            const { _id }: IUser = await UserModel.findByDisplayName(displayName);

            const locker: IPinLocker[] = await PinLocker.lockerList(_id, cursor);
            const next = locker.length === 15 ? `/pin/locker/private/list?cusor=${locker[14]._id}` : null;
            const pinWithData = locker.map(serializeLocker);
            res.json({
                next,
                pinWithData,
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    public routes(): void {
        const { router } = this;

        router.post('/:id', needAuth, checkPinExistancy, this.createLockerPin);
        router.delete('/:id', needAuth, checkPinExistancy, this.deleteLockerPin);

        router.get('/:id', needAuth, checkPinExistancy, this.getLockerList);
        router.get('/:displayName/list', needAuth, this.lockerList);
    }
}

export default new LockerRouter().router;