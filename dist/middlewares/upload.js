import multer from 'multer';
import util from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const maxSize = 5 * 1024 * 1024;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../../uploads/`);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single('file');
let uploadFileMiddleware = util.promisify(uploadFile);
export { uploadFileMiddleware };
//# sourceMappingURL=upload.js.map