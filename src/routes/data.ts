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

dataRouter.get('/all', auth, index);
dataRouter.get('/search/sentences/:id', auth, searchSentences);
dataRouter.get('/search/word/:word', auth, searchWord);
dataRouter.get('/search/topwords/:id', auth, searchTopFive);
dataRouter.get('/download/:id', auth, download);
dataRouter.post('/create', auth, create);
dataRouter.post('/search/wordcount', auth, searchWordCount);
dataRouter.post('/search/image', auth, searchPageImage);
dataRouter.delete('/delete/:id', auth, destroy);

export { dataRouter };
