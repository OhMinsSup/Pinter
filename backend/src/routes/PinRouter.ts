import { Request, Response, Router } from 'express';
import * as joi from 'joi';
import { diff } from 'json-diff';
import needAuth from '../lib/middleware/needAuth';
import User, { IUser } from '../database/models/User';
import Pin, { IPin } from '../database/models/Pin';
import Tag, { ITag } from '../database/models/Tag';
import Like from '../database/models/Like';
import Locker from '../database/models/PinLocker';
import Comment from '../database/models/Comment';
import Count from '../database/models/Count';
import {
    filterUnique,
    checkPinExistancy,
} from '../lib/common';
import {
    serializePin,
} from '../lib/serialize';

class PinRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    private async writePin(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            relationUrl: string;
            body: string;
            urls: string[];
            tags: string[];
        };

        const schema = joi.object().keys({
            relationUrl: joi.string(),
            body: joi.string(),
            urls:  joi.array().items(joi.string()).required(),
            tags: joi.array().items(joi.string()).required(),
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        const { relationUrl, body, urls, tags }: BodySchema = req.body;
        const userId: string = req['user']._id;
        const uniqueTags: string[] = filterUnique(tags);

        try {            
            const pin = await new Pin({
                relationUrl,
                body,
                urls,
                user: userId,
            });

            const pinId = pin._id;       
            const tagIds: ITag[] = await Promise.all(uniqueTags.map(tag => Tag.getTagId(tag, pinId)));
            pin.tags = tagIds;
            pin.save();
            await Count.pinCount(userId);
            res.json({
                pinId,
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async updatePin(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            relationUrl: string,
            body: string,
            urls: string,
            tags: string[],
        };

        const schema = joi.object().keys({
            relationUrl: joi.string(),
            body: joi.string(),
            urls: joi.array().items(joi.string()).required(),
            tags: joi.array().items(joi.string()).required(),
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        const { relationUrl, body, urls, tags }: BodySchema = req.body;
        const pinId: string = req['pin']._id;

        if (tags) {
            const currentTags = await Tag.getTagNames(pinId);
            const tagNames: string[] = currentTags.map(tag => tag.name);
            const tagDiff: string[] = diff(tagNames.sort(), tags.sort()) || [];
            const tagsToRemove: string[] = tagDiff.filter(info => info[0] === '-').map(info => info[1]);
            const tagsToAdd: string[] = tagDiff.filter(info => info[0] === '+').map(info => info[1]);
            
            try {
                await Tag.removeTagsFromPin(pinId, tagsToRemove);
                await Tag.addTagsToPin(pinId, tagsToAdd);
                
                await Pin.findByIdAndUpdate(pinId, {
                    relation_url: relationUrl,
                    body,
                    urls,
                }, { new: true })
                .lean();

                const pinData = await Pin.readPinById(pinId);
                const serialized = serializePin(pinData);
                res.json(serialized);
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    private async deletePin(req: Request, res: Response): Promise<any> {
        const pinId: string = req['pin']._id;
        const userId: string = req['user']._id;
       
        try {
            await Promise.all([
                Comment.deleteMany({ pin: pinId }).lean().exec(),
                Like.deleteMany({ pin: pinId }).lean().exec(),
                Locker.deleteMany({ pin: pinId }).lean().exec(),   
            ]);

            await Pin.deleteOne({
                _id: pinId,
            }).lean();
            await Count.unpinCount(userId);

            res.json({
                pin: true,
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async readPin(req: Request, res: Response): Promise<any> {
        const pinId = req['pin']._id;

        try {
            const pin: IPin = await Pin.readPinById(pinId);
            res.json(serializePin(pin));
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async listPin(req: Request, res: Response): Promise<any> {
        const { displayName } = req.params;
        const { cursor } = req.query;
        
        let userId: string = null;
        try {
            if (displayName) {
                let { _id }: IUser = await User.findByDisplayName(displayName);                        
                userId = _id;
            }
            
            const pin: IPin[] = await Pin.readPinList(userId, cursor);
            const next = pin.length === 15 ? `/pin/${displayName ? `${displayName}/list` : 'all/list' }?cursor=${pin[14]._id}` : null;
            const pinWithData = pin.map(serializePin);
    
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

        router.post('/', needAuth, this.writePin);

        router.get('/:id', needAuth, checkPinExistancy, this.readPin);
        
        router.get('/all/list', needAuth, this.listPin);
        router.get('/:displayName/list', needAuth, this.listPin);

        router.delete('/:id', needAuth, checkPinExistancy, this.deletePin);
        router.patch('/:id', needAuth, checkPinExistancy, this.updatePin);
    }
}

export default new PinRouter().router;