import express, { Router } from 'express';
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

dataRouter.post('/create', create);
dataRouter.get('/all', index);
dataRouter.post('/search/sentences', searchSentences);
dataRouter.post('/search/word', searchWord);
dataRouter.post('/search/topwords', searchTopFive);
dataRouter.post('/search/wordcount', searchWordCount);
dataRouter.post('/search/image', searchPageImage);
dataRouter.post('/download', download);
dataRouter.delete('/delete', destroy);

export { dataRouter };
