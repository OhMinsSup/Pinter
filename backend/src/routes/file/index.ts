import { Router } from 'express';
import * as multer from 'multer';
import * as fileCtrl from './file.ctrl';
import needAuth from '../../lib/middleware/needAuth';

const memoryStorage = multer.memoryStorage();
const upload = multer({
    storage: memoryStorage,
});

const file = Router();

file.post('/create-signed-url', needAuth, upload.single('file'), fileCtrl.createSignedUrl);

export default file;