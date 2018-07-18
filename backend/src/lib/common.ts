import { Request, Response, NextFunction } from 'express';
import Pin from '../database/models/Pin';

export const filterUnique = (array: Array<string>) => {
    return [...new Set(array)];
};

export const checkPinExistancy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const pin = await Pin.findById(id);

        if (!pin) {
            return res.status(404).json({
                name: 'pin이 존재하지 않습니다'
            });
        }

        req['pin'] = pin;
    } catch (e) {
        res.status(500).json(e);
    }
    return next();
} 

// 3개의 컬력션 연결
    /*
    .populate({
        path: 'tags',
        populate: {
            path: 'tag',
            model: 'Tag'
        }
    });
    */