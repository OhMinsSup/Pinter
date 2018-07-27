import { Request, Response, Router } from 'express';
import * as joi from 'joi';
import * as filesize from 'filesize';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import { diff } from 'json-diff';
import * as config from '../config/config';
import needAuth from '../lib/middleware/needAuth';
import User, { IUser } from '../database/models/User';
import Pin, { IPin } from '../database/models/Pin';
import Tag, { ITag } from '../database/models/Tag';
import PinLocker, { IPinLocker } from '../database/models/PinLocker';
import Count from '../database/models/Count';
import {
    filterUnique,
    checkPinExistancy
} from '../lib/common';
import {
    serializePin, serializeLocker,
} from '../lib/serialize';

const s3 = new AWS.S3({
    region: 'ap-northeast-2',
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_KEY
});

const memoryStorage = multer.memoryStorage();

const upload = multer({
    storage: memoryStorage
});

class PinRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    private async createSignedUrl(req: Request, res: Response): Promise<any> {
        const { file } = req;

        if (!file) {
            return res.status(400).json({
                name: '파일이 존재하지 않습니다.'
            });
        }
        
        const userId: string = req['user']._id;
        const displayName: string = req['user'].displayName;
        const stats = filesize(file.size);
        Pin.update
        // 10MB 크기 제한
        if (parseInt(stats) > 10000) {
            return res.status(413).json({
                name: '파일 사이즈 초과',
                payload: '10MB'
            });
        }

        try {
            const { _id: id }: IUser = await User.findById(userId);
            const filePath: string = `pinter-file/${displayName}/${id}/${file.originalname}`;

            const response = await s3.upload({
                Bucket: 'pinterfiles',
                Key: filePath,
                Body: file.buffer,
                ContentType: file.mimetype
            }).promise();

            if (!response || !response.ETag) return res.status(418);

            res.json({
                url: response.Location,
                path: response.Key
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async writePin(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            relationUrl: string,
            description: string,
            urls: Array<string>,
            tags: Array<string>
        }

        const schema = joi.object().keys({
            relationUrl: joi.string(),
            description: joi.string().max(200),
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

        const { relationUrl, description, urls, tags }: BodySchema = req.body;
        const userId: string = req['user']._id;
        const uniqueTags: Array<string> = filterUnique(tags);

        try {            
            const pin = await new Pin({
                relation_url: relationUrl,
                description: description,
                urls: urls,
                user: userId
            })

            const pinId = pin._id;       
            const tagIds: Array<ITag> = await Promise.all(uniqueTags.map(tag => Tag.getTagId(tag, pinId)));
            pin.tags = tagIds;
            pin.save();

            const pinData: IPin = await Pin.readPinById(pinId);  
            const serialized = serializePin(pinData);
            await Count.pinCount(userId);          
            res.json(serialized);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    private async updatePin(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            relationUrl: string,
            description: string,
            urls: string,
            tags: Array<string>
        }

        
        const schema = joi.object().keys({
            relationUrl: joi.string(),
            description: joi.string().max(200),
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

        const { relationUrl, description, urls, tags }: BodySchema = req.body;
        const pinId: string = req['pin']._id;
        if (tags) {
            const currentTags = await Tag.getTagNames(pinId);
            const tagNames: Array<string> = currentTags.map(tag => tag.name);
            const tagDiff: Array<string> = diff(tagNames.sort(), tags.sort()) || [];
            const tagsToRemove: Array<string> = tagDiff.filter(info => info[0] === '-').map(info => info[1]);
            const tagsToAdd: Array<string> = tagDiff.filter(info => info[0] === '+').map(info => info[1]);
            try {
                await Tag.removeTagsFromPin(pinId, tagsToRemove);
                await Tag.addTagsToPin(pinId, tagsToAdd);
                
                await Pin.findByIdAndUpdate(pinId, {
                    relation_url: relationUrl,
                    description: description,
                    urls: urls,
                }, { new: true });

                const pinData = await Pin.readPinById(pinId);
                const serialized = serializePin(pinData);
                res.json(serialized);
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    private async deletePin(req: Request, res: Response): Promise<any> {
        const pinId = req['pin']._id;
        const userId: string = req['user']._id;

        try {
            const { tags } = await Pin.findOne({ _id: pinId })

            await Promise.all(tags.map(tag => Tag.findByIdAndUpdate(tag, {
                $pop: { pin: pinId }
            }, { new: true })));
            await Pin.deleteOne({
                _id: pinId
            });
            await Count.unpinCount(userId)
            res.status(204).json({
                pin: true
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async readPin(req: Request, res: Response): Promise<any> {
        const pinId = req['pin']._id;

        try {
            const pin: IPin = await Pin.readPinById(pinId);
            res.json(serializePin(pin))
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async listPin(req: Request, res: Response): Promise<any> {
        const { username } = req.params;
        const { cursor } = req.params;
        let userId: string = null;
        try {
            if (username) {
                let { _id }: IUser = await User.findByDisplayName(username);                        
                userId = _id;
            }

            const pin: Array<IPin> = await Pin.readPinList(userId, cursor);
            const next = pin.length === 25 ? `/pin/${username ? `${username}`: '' }?cusor=${pin[24]._id}` : null;
            const pinWithData = pin.map(serializePin);
    
            res.json({
                next,
                pinWithData
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async createLockerPin(req: Request, res: Response): Promise<any> {
        const userId: string = req['user']._id;
        const pinId: string = req['pin']._id;

        try {
            const exists: IPinLocker = await PinLocker.checkExists(userId, pinId);

            if (exists) {
                return res.status(409).json({
                    name: '이미 보관중입니다'
                });
            }

            const locker = await PinLocker.create({ user: userId, pin: pinId });
            await PinLocker.lockerCount(locker._id);
            res.json({
                locker: !!locker
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async deleteLockerPin(req: Request, res: Response): Promise<any> {
        const userId: string = req['user']._id;
        const pinId: string = req['pin']._id;

        try {
            const exists: IPinLocker = await PinLocker.checkExists(userId, pinId);
            
            if (!exists) {
                return res.status(409).json({
                    name: '보관하지 않은 핀입니다.'
                });
            }

            await PinLocker.lockerUnCount(exists._id);
            await exists.remove();
            res.status(204).json({
                locker: true
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async lockerList(req: Request, res: Response): Promise<any> {
        const userId: string = req['user']._id;
        const { cursor } = req.query;
        
        try {
            const locker: Array<IPinLocker> = await PinLocker.lockerList(userId, cursor);
            const next = locker.length === 25 ? `/pin/locker/list?cusor=${locker[24]._id}` : null;
            const lockersWithData = locker.map(serializeLocker);
            const count: Array<IPinLocker> = await PinLocker.countLocker();
            res.json({
                next,
                count: count.map(count => count.count).toString(),
                lockersWithData,
            })
        } catch (e) {
            res.status(500).json(e);
        }
    }
    
    public routes(): void {
        const { router } = this;

        router.post('/create-signed-url', needAuth, upload.single('file'), this.createSignedUrl);
        router.post('/', needAuth, this.writePin);

        router.get('/:id', needAuth, checkPinExistancy, this.readPin);
        router.get('/all/list', needAuth, this.listPin);
        router.get('/:username/list', needAuth, this.listPin);
        router.get('/locker/private/list', needAuth, this.lockerList);
        router.get('/:id/locker',needAuth, checkPinExistancy, this.createLockerPin);

        router.delete('/:id', needAuth, checkPinExistancy, this.deletePin);
        router.delete('/:id/locker', needAuth, checkPinExistancy, this.deleteLockerPin);
        router.patch('/:id', needAuth, checkPinExistancy, this.updatePin);
    }
}

export default new PinRouter().router;