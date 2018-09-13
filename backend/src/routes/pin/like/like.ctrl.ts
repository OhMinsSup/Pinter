import { Request, Response } from 'express';
import Pin from '../../../database/models/Pin';
import Like, { ILike } from '../../../database/models/Like';

export const like = async (req: Request, res: Response): Promise<any> => {
    const pinId: string = req['pin']._id;
    const userId: string = req['user']._id;

    try {
        const exists: ILike = await Like.checkExists(userId, pinId);

        if (exists) {
            return res.status(409).json({
                name: '이미 like 중입니다',
            });
        }

        await Like.create({
            user: userId,
            pin: pinId,
        });

        await Pin.like(pinId);
        const pin = await Pin.findById(pinId).lean();

        res.json({
            liked: true,
            likes: pin.likes,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

export const unlike = async (req: Request, res: Response): Promise<any> => {
    const pinId: string = req['pin']._id;
    const userId: string = req['user']._id;

    const exists: ILike = await Like.checkExists(userId, pinId);

    if (!exists) {
        return res.status(409).json({
            name: 'like를 하지 않았습니다',
        });
    }

    await Like.deleteOne({ 
        $and: [
            {
                pin: pinId,
                user: userId,
            },
        ],
     }).lean();
    await Pin.unlike(pinId);
    const pin = await Pin.findById(pinId).lean();
    res.json({
        liked: false,
        likes: pin.likes,
    });
};

export const getLike = async (req: Request, res: Response): Promise<any> => {
    const pinId: string = req['pin']._id;
    const userId: string = req['user']._id;

    let liked = false;
    
    try {
        if (userId) {
            const exists = await Like.checkExists(userId, pinId);
            liked = !!exists;
        }
        
        const pin = await Pin.findById(pinId).lean();

        res.json({
            liked,
            likes: pin.likes,
        });
    } catch (e) {
        res.status(500).json(e);
    }
};