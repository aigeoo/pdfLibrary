import { Request, Response } from 'express';
import { uploadFileMiddleware } from "../middlewares/upload.js";

const create = async (req: Request, res: Response): Promise<void> => {
    //
};

const index = (req: Request, res: Response): void => {
    //
};

const download = (req: Request, res: Response): void => {
    //
};

const destroy = (req: Request, res: Response): void => {
    //
};

const searchTopFive = (req: Request, res: Response): void => {
    //
};

const searchWord = (req: Request, res: Response): void => {
    //
};

const searchWordCount = (req: Request, res: Response): void => {
    //
};

const searchPageImage = (req: Request, res: Response): void => {
    //
};

const searchSentences = (req: Request, res: Response): void => {
    //
};

export {
    create,
    index,
    download,
    destroy,
    searchTopFive,
    searchWord,
    searchWordCount,
    searchPageImage,
    searchSentences
};
