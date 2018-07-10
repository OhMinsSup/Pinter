import { Request, Response, Router } from 'express';
import * as joi from 'joi';
import * as filesize from 'filesize';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as config from '../config/config';
import PinImage from '../database/models/PinImage';
import needAuth from '../lib/middleware/needAuth';

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
        
        const userId: string = req['user'].id;
        const displayName: string = req['user'].displayName;
        const stats = filesize(file.size);

        // 10MB 크기 제한
        if (parseInt(stats) > 10000) {
            return res.status(413).json({
                name: '파일 사이즈 초과',
                payload: '10MB'
            });
        }

        try {
            const filePath: string = `pinter-file/${displayName}/${file.originalname}`;

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
            url: string
        }

        const schema = joi.object().keys({
            relationUrl: joi.string(),
            description: joi.string().max(200),
            url: joi.string()
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        const { relationUrl, description, url }: BodySchema = req.body;
        const userId: string = req['user'].id;

        try {
            
        } catch (e) {
            res.status(500).json(e)
        }
    }

    public routes(): void {
        const { router } = this;

        router.post('/create-signed-url', needAuth, upload.single('file'), this.createSignedUrl);
        router.post('/', this.writePin);
    }
}

export default new PinRouter().router;