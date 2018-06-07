import { Request, Response, Router, NextFunction } from 'express';
import * as multer from 'multer';
import * as path from 'path';
import * as _ from 'lodash';
import { storage } from '../lib/fileStorage';

class FileRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    private uploadFile(req: Request, res: Response, next: NextFunction): void {
        const files = _.get(req, 'files', []);
        let fileModels: Array<any> = [];
        
        _.each(files, (fileObject) => {
            console.log(fileObject);
        });
        res.json(files);
    }

    public routes(): void {
        const { router } = this;
        const storageDir = path.join(__dirname, '..', 'storage');
        
        const upload = multer({
            storage: storage
        });

        router.post('/upload', upload.array('files'), this.uploadFile);
    }
}

export default new FileRouter().router;