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
import {
    filterUnique,
    checkPinExistancy
} from '../lib/common';
import {
    serializePin,
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
            url: string,
            tags: Array<string>
        }

        const schema = joi.object().keys({
            relationUrl: joi.string(),
            description: joi.string().max(200),
            url: joi.string().required(),
            tags: joi.array().items(joi.string()).required(),
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        const { relationUrl, description, url, tags }: BodySchema = req.body;
        const userId: string = req['user']._id;
        const uniqueTags: Array<string> = filterUnique(tags);

        try {            
            const pin = await new Pin({
                relation_url: relationUrl,
                description: description,
                url: url,
                user: userId
            })

            const pinId = pin._id;       
            const tagIds: Array<ITag> = await Promise.all(uniqueTags.map(tag => Tag.getTagId(tag, pinId)));
            pin.tags = tagIds;
            pin.save();
            
            const pinData = await Pin.readPinById(pinId);            
            const serialized = serializePin(pinData);            
            res.json(serialized);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    private async updatePin(req: Request, res: Response): Promise<any> {
        type BodySchema = {
            relationUrl: string,
            description: string,
            url: string,
            tags: Array<string>
        }

        
        const schema = joi.object().keys({
            relationUrl: joi.string(),
            description: joi.string().max(200),
            url: joi.string().required(),
            tags: joi.array().items(joi.string()).required(),
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        const { relationUrl, description, url, tags }: BodySchema = req.body;
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
                    url: url,
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

        try {
            const { tags } = await Pin.findOne({ _id: pinId })

            await Promise.all(tags.map(tag => Tag.findByIdAndUpdate(tag, {
                $pop: { pin: pinId }
            }, { new: true })));
            await Pin.deleteOne({
                _id: pinId
            });
            res.status(204);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    
    public routes(): void {
        const { router } = this;

        router.post('/create-signed-url', needAuth, upload.single('file'), this.createSignedUrl);
        router.post('/', needAuth, this.writePin);

        router.delete('/:id/', needAuth, checkPinExistancy, this.deletePin);
        router.patch('/:id/', needAuth, checkPinExistancy, this.updatePin);
    }
}

export default new PinRouter().router;