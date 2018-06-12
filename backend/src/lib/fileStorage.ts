import * as multer from 'multer';
import * as path from 'path';

export const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'storage/');
    },
    filename: (req, file, callback) => {
        const filename = `${Date.now().toString()}-${file.originalname}`;
        callback(null, filename);
    }
});

