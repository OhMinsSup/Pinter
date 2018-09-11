import { Request, Response, NextFunction } from "express";
import Pin from "../database/models/Pin";
import Group from '../database/models/Group';

export const filterUnique = (array: string[]) => {
    return [...new Set(array)];
};

export const checkPinExistancy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const pin = await Pin.findById(id).lean();

        if (!pin) {
            return res.status(404).json({
                name: "pin이 존재하지 않습니다",
            });
        }

        req["pin"] = pin;
    } catch (e) {
        res.status(500).json(e);
    }
    return next();
};

export const checkGroupExistancy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const group = await Group.findById(id).lean();

        if (!group) {
            return res.status(404).json({
                name: 'group이 존재하지 않습니다',
            });
        }

        req['group'] = group;
    } catch (e) {
        res.status(500).json(e);
    }
    return next();
}
