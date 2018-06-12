import { Request, Response, Router, NextFunction } from 'express';
import * as multer from 'multer';
import * as filePath from 'path';
import * as fs from 'fs';
import * as joi from 'joi';
import Pin, { IPin } from '../models/Pin';
import Board, { IBoard } from '../models/Board';
import { storage } from '../lib/fileStorage';

class PinRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    private async createUploadPin (req: Request, res: Response, next: NextFunction): Promise<any> {
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

        const { path: imgPath, originalname, mimetype } = req.file;
        const uploadDir: string = filePath.resolve(__dirname, '../../');
        const { path } = fs.createReadStream(uploadDir + '\\' + imgPath);
        const  { title, description }: BodySchema = req.body;
        const userId: string = req['user']._id;


        try {
            const pin: IPin = await Pin.createPinImgUpload(
                title, 
                description, 
                path, 
                mimetype, 
                originalname, 
                userId
            );
            const pinWithData = await Pin.findById(pin._id);
            res.json(pinWithData);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    private async createUrlPin (req: Request, res: Response, next: NextFunction): Promise<any> {
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
        const  { title, description, url }: BodySchema = req.body;

        try {
            const pin: IPin = await Pin.createPinUrl(
                title, 
                description, 
                url, 
                userId
            );
            const pinWithData = await Pin.findById(pin._id);
            res.json(pinWithData);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    private async createBoard (req: Request, res: Response, next: NextFunction): Promise<any> {
        type BodySchema = {
            title: string
            pinId?: string
        }
        
        const schema = joi.object().keys({
            title: joi.string().required(),
        });

        const result: any = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json({
                name: 'WRONG_SCHEMA',
                payload: result.error,
            });
        }

        const userId: string = req['user']._id;
        const  { title, pinId }: BodySchema = req.body;

        try {
            if (pinId) {
                const pinExists = await Pin.findById(pinId);
                
                if (!pinExists) {
                    return res.status(404).json({
                        payload: '존재하지 않는 pin입니다'
                    });
                }
            } 

            const board: IBoard = await Board.createBoard(title, userId, pinId);
            const boardWithData = await Board.findById(board._id);
            res.json(boardWithData);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    public routes(): void {
        const { router } = this;        
        const upload = multer({
            storage: storage,
            limits: {
                fileSize: 1024 * 1024 * 10
            }
        });

        router.post('/upload/imag', upload.single('img'), this.createUploadPin);
        router.post('/url/imag', this.createUrlPin);
        router.post('/board', this.createBoard);


    }
}

export default new PinRouter().router;