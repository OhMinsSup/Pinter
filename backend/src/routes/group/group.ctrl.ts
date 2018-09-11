import { Request, Response } from 'express';
import * as joi from 'joi';
import Group from '../../database/models/Group';

export const writeGroup = async (req: Request, res: Response): Promise<any> => {
    type BodySchem = {
        title: string,
        description: string,
        coverThumbnail: string,
        visibility: string,
    }

    const schema = joi.object().keys({
        title: joi.string().required(),
        description: joi.string().required(),
        coverThumbnail: joi.string().uri(),
        visibility: joi.string().valid('public', 'private')
    });

    const result = joi.validate(req. body, schema);

    if (result.error) {
        return res.status(400).json({
            name: 'WRONG_SCHEMA',
            payload: result.error,
        });
    }

    const { title, description, coverThumbnail, visibility }: BodySchem = req.body;
    const userId: string = req['user']._id;

    try {
        const group = await new Group({
            title,
            description,
            coverThumbnail,
            visibility,
            creator: userId, 
        }).save();

        res.json({
            groupId: group._id,
        })
    
    } catch (e) {
        res.status(500).json(e);
    }
}