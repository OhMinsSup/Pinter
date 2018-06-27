import { Request, Response, Router } from 'express';
import * as joi from 'joi';
import * as filesize from 'filesize';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as config from '../config/config';
import Auth, { IAuth } from '../models/Auth';
import Pin, { IPin } from '../models/Pin';
import needAuth from '../lib/middleware/needAuth';
import { serializePin } from '../lib/serialize';

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

    private async pinImageUrl (req: Request, res: Response): Promise<any> {
        type BodySchema = {
            title: string,
            description: string,
            url: string
        }

        const schema = joi.object().keys({
            title: joi.string().required(),
            description: joi.string().max(200).required(),
            url: joi.string().required()
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        const userId: string = req['user']._id;
        const { title, description, url }: BodySchema = req.body;

        try {
            const pinFile: IPin = new Pin({
                user: userId,
                title: title,
                description: description,
                url: url
            });

            pinFile.save();

            const { _id: pinId } = pinFile;

            const pinwithData = await Pin.findById(pinId); 

            if (!pinwithData) {
                return res.status(409).json({
                    name: '핀이 존재하지 않습니다.'
                });
            }

            res.json(pinwithData.toJSON());

        } catch (e) {
            return res.status(500).json(e);
        }
    }

    private async pinImageUpload (req: Request, res: Response): Promise<any> {
        type BodySchema = {
            title: string,
            description: string,
        }

        const schema = joi.object().keys({
            title: joi.string().required(),
            description: joi.string().max(200).required()
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        if (!req.file) {
            return res.status(400).json({
                name: '파일이 존재하지 않습니다.'
            });
        }

        const { file } = req;
        const userId: string = req['user']._id;
        const displayName: string = req['user'].displayName;
        const { title, description }: BodySchema = req.body;
        const stats = filesize(file.size);

        // 10MB 크기 제한
        if (parseInt(stats) > 10000) {
            return res.status(413).json({
                name: '파일 사이즈 초과',
                payload: '10MB'
            });
        }
        
        try {            
            const pinFile: IPin = new Pin({
                user: userId,
                filesize: parseInt (stats),
                filename: file.originalname
            });

            const filepath = `pinter-file/${displayName}/${pinFile._id}/${file.originalname}`;
            
            const response = await s3.upload({
                Bucket: 'pinterfiles',
                Key: filepath,
                Body: file.buffer,
                ContentType: file.mimetype
            }).promise();

            if (!response || !response.ETag) {
                return res.status(418);
            }
            
            pinFile.filepath = `https://s3.ap-northeast-2.amazonaws.com/pinterfiles/${filepath}`
            pinFile.title = title;
            pinFile.description = description;
            pinFile.save();

            const { _id: pinId } = pinFile;

            const pinWithData = await Pin.findById(pinId).populate('user','profile');

            if (!pinWithData) {
                return res.status(409).json({
                    name: '핀이 존재하지 않습니다.'
                });
            }

            res.json(pinWithData.toJSON());
        } catch (e) {
            return res.status(500).json(e);
        }
    };

    private async listPin (req: Request, res: Response): Promise<any> {
        const { username } = req.params;
        const { cursor } = req.query;
        let userId: string | null = null;

        if (username) {
            const user: IAuth = await Auth.findByEmailOrUsername('username', username);

            if (!user) {
                return res.status(409).json({
                    name: '존재하지 않는 유저입니다.'
                });
            }
            userId = user._id;
        }

        const query = {
            user: userId,
            cursor
        }

        try {
            const pins: Array<IPin> = await Pin.listPins(query);
            const next = pins.length === 20 ? `/pin/${username ? `${username}/mypin/` : ''}?cursor=${pins[19]._id}` : null;
            const pinsWithData = pins.map(serializePin);

            res.setHeader('Count', pinsWithData.length);

            res.json({
                next,
                pinsWithData
            });
        } catch (e) {
            return res.status(500).json(e);
        }
    }
    
    public routes(): void {
        const { router } = this;        

        router.post('/upload/', needAuth, upload.single('file'), this.pinImageUpload);
        router.post('/url/', needAuth, this.pinImageUrl);
        router.get('/', this.listPin);
        router.get('/:username/mypin', this.listPin);
    }
}

export default new PinRouter().router;