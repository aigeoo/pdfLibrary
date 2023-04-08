import express, { Router } from 'express';
import { auth } from '../middlewares/verify.js';
import {
    create,
    index,
    download,
    destroy,
    searchTopFive,
    searchWord,
    searchWordCount,
    searchPageImage,
    searchSentences,
} from '../controllers/dataController.js';

const dataRouter: Router = express.Router();

dataRouter.post('/create', auth, create);
dataRouter.get('/all', auth, index);
dataRouter.post('/search/sentences', auth, searchSentences);
dataRouter.post('/search/word', auth, searchWord);
dataRouter.post('/search/topwords', auth, searchTopFive);
dataRouter.post('/search/wordcount', auth, searchWordCount);
dataRouter.post('/search/image', auth, searchPageImage);
dataRouter.post('/download', auth, download);
dataRouter.delete('/delete', auth, destroy);

export { dataRouter };
