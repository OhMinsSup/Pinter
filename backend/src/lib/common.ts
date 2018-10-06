import { Request, Response, NextFunction } from "express";
import Pin from "../database/models/Pin";

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
        return res.status(500).json(e);
    }
    return next();
};

