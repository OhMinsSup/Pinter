import { Request, Response, NextFunction } from "express";
import Pin from "../database/models/Pin";
import Board from "../database/models/Board";

export const filterUnique = (array: string[]) => {
    return [...new Set(array)];
};

export const checkPinExistancy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const pin = await Pin.findById(id);

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

export const checkBoardExistancy  = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const board = await Board.findById(id);

        if (!board) {
            return res.status(404).json({
                name: "board이 존재하지 않습니다",
            });
        }

        req["board"] = board;
    } catch (e) {
        res.status(500).json(e);
    }
    return next();
};