import { Request, Response } from 'express';
import * as joi from 'joi';
import Group from '../../../database/models/Group';

export const createGroup = async(req: Request, res: Response): Promise<any> => {
    type BodySchema = {
        title: string,
        activation: boolean,
    }

    const shcema = joi.object().keys({
        title: joi.string().max(200).required(),
        Activation: joi.bool().required(),
    });

    const result = joi.validate(req.body, shcema);

    if (result.error) {
        return res.status(400).json({
            name: 'WRONG_SCHEMA',
            payload: result.error,
        });
    }

    const { title, activation }: BodySchema = req.body;
    const userId: string = req['user']._id;

    if (!title) return res.status(400).json({
        name: '제목을 입력하지 않아 그룹을 생성할 수 없습니다'
    });

    try {
        const group = await new Group({
            title,
            user: userId,
            activation
        }).save();

        res.json({
            groupId: group._id,
            title: group.title,
            activation: group.activation,
        });
    } catch (e) {
        res.status(500).json(e);
    }
}
