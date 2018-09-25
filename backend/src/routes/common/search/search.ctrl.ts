import { Request, Response } from 'express';
import Pin, { IPin } from '../../../database/models/Pin';
import User, { IUser } from '../../../database/models/User';
import Tag, { ITag } from '../../../database/models/Tag';
import { serializePin, serializeUsers } from '../../../lib/serialize';

export const serachPin = async (req: Request, res: Response): Promise<any> => {
    type BodySchema = {
        value?: string,
        type?: 'body' | 'url',
    }

    const { value, type = 'body' }: BodySchema = req.body;
    const { cursor } = req.query;
    let searchBy;

    if (!value) {
        return res.status(204).json({
            next: null,
            Data: null,
        });
    }

    if (type === 'body') {
        searchBy = Object.assign(
            {},
            { _id: { $lt: cursor }, body: { $regex: value } },
        );
        return;
    } else if (type === 'url') {
        searchBy = Object.assign(
            {},
            { _id: { $lt: cursor }, relationUrl: { $regex: value } }
        );
        return;
    }

    try {
        const pin: IPin[] = await Pin.find(searchBy)
        .populate("user")
        .limit(10)
        .sort({ _id: -1 })
        .lean();
        const next = pin.length === 10 ? `/common/search/pin?cursor=${pin[9]._id}` : null;

        res.json({
            next,
            Data: pin.map(serializePin),
        });
    } catch (e) {
        res.status(500).json(e);
    }
}

export const serachUser = async (req: Request, res: Response): Promise<any> => {
    type BodySchema = {
        value?: string,
    }

    const { value }: BodySchema = req.body;
    const { cursor } = req.query;

    if (!value) {
        return res.status(204).json({
            next: null,
            Data: null,
        });
    }

    const searchBy = Object.assign(
        {},
        { 
            _id: {
                $lt: cursor,
            },
            'profile.displayName': {
                $regex: value,
            },
        }
    );

    try {
        const user: IUser[] = await User.find(searchBy)
        .limit(10)
        .sort({ _id: -1 })
        .lean();

        const next = user.length === 10 ? `/common/search/user?cursor=${user[9]._id}` : null;

        res.json({
            next,
            Data: user.map(serializeUsers),
        });
    } catch (e) {
        res.status(500).json(e);
    }
}

export const searchTag = async (req: Request, res: Response): Promise<any> => {
    type BodySchema = {
        value?: string,
    }

    const { value }: BodySchema = req.body;
    const { cursor } = req.query;

    if (!value) {
        return res.status(204).json({
            next: null,
            Data: null,
        });
    }

    const searchBy = Object.assign(
        {},
        { 
            _id: {
                $lt: cursor,
            },
            name: {
                $regex: value,
            },
        }
    );

    try {
        const tag: ITag[] = await Tag.find(searchBy)
        .limit(10)
        .sort({ _id: -1 })
        .lean();

        const next = tag.length === 10 ? `/common/search/tag?cursor=${tag[9]._id}` : null;

        res.json({
            next,
            Data: tag,
        });
    } catch (e) {
        res.status(500).json(e);
    }
}