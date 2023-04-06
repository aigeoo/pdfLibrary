import multer from 'multer';
import util from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Request } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const maxSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, `${__dirname}/../uploads/`);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single('file');

let uploadFileMiddleware = util.promisify(uploadFile);
export { uploadFileMiddleware };
