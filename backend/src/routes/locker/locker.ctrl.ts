import { Request, Response } from 'express';
import Locker, { ILockerModel, ILocker } from '../../database/models/Locker';
import User, { IUser } from '../../database/models/User';
import { serializeLocker } from '../../lib/serialize';

export const lockerPin = async (req: Request, res: Response): Promise<any> => {
    const userId: string = req['user']._id;
    const pinId: string = req['pin']._id;

    try {
        const exists: ILockerModel = await Locker.checkExists(userId, pinId);

        if (exists) {
            return res.status(409).json({
                name: '이미 보관중입니다',
            });
        }

        const locker = await Locker.create({ user: userId, pin: pinId });
        res.json({
            locker: !!locker,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

export const unLockerPin = async (req: Request, res: Response): Promise<any> => {
    const userId: string = req['user']._id;
    const pinId: string = req['pin']._id;

    try {
        const exists: ILockerModel = await Locker.checkExists(userId, pinId);
        
        if (!exists) {
            return res.status(409).json({
                name: '보관하지 않은 핀입니다.',
            });
        }

        await Locker.deleteOne({
            $and: [
                {
                    user: userId,
                    pin: pinId,
                },
            ],
        });
        res.status(204).json({
            locker: true,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

export const getLockerPin = async (req: Request, res: Response): Promise<any> => {
    const userId: string = req['user']._id;
    const pinId: string = req['pin']._id;

    let locker = false;

    if (userId) {
        const exists = await Locker.checkExists(userId, pinId);
        locker = !!exists;
    }

    try {
        res.json({
            locker,
        });
        
    } catch (e) {
        res.status(500).json(e);
    }
};

export const lockerList = async (req: Request, res: Response): Promise<any> => {
    const { cursor } = req.query;
    const { displayName } = req.params;

    try {
        const { _id }: IUser = await User.findByDisplayName(displayName);

        const locker: ILocker[] = await Locker.lockerList(_id, cursor);
        const next = locker.length === 10 ? `/pin/locker/private/list?cusor=${locker[9]._id}` : null;
        const pinWithData = locker.map(serializeLocker);
        res.json({
            next,
            pinWithData,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};