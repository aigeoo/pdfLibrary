import { Request, Response } from 'express';
import fs from 'fs';
// @ts-ignore
import pdf from 'parse-pdf'; 
import { createCanvas, Canvas, CanvasRenderingContext2D } from 'canvas';
import { uploadFileMiddleware } from '../middlewares/upload.js';
import Data, { IData } from '../models/data.js';

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        await uploadFileMiddleware(req, res);

        if (! req.file) {
            res.status(400).send('No File Uploaded');
            return;
        }

        const randomNumber: number = Math.floor(Math.random() * 9000) + 1000;

        const theFile: IData = new Data({
            _id: randomNumber,
            name: req.file.originalname,
            size: req.file.size,
            path: req.file.path,
        });

        let dataBuffer: Buffer = fs.readFileSync(req.file.path);

        pdf(dataBuffer).then(function(data: any) {
            if (! data.pages) {
                res.status(400).send('Invalid PDF Format');
                return;
            }

            theFile.content = data.pages;
            theFile.pages = theFile.content.length;

            try {
                theFile.save();
                res.status(200).send('File Uploaded Successfully')
            } catch (error) {
                return res.status(400).send('Bad Request');
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: IData[] = await Data.find({}, { __v: 0 });

        if (! data || ! Array.isArray(data) || data.length === 0) {
            res.status(400).send('There Are No Registered Files');
            return;
        }

        res.json(data);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    };
};

const download = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: IData | null  = await Data.findOne({ _id: req.params.id });

        if (! data) {
            res.status(400).send('No File Assigned With That Id');
            return;
        }

        res.download(data.path, function(err) {
            if(err) {
                console.log(err);
            }
        })
    } catch (error) {
        res.status(500).send('Internal Server Error');
    };
};

const destroy = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: IData | null  = await Data.findOne({ _id: req.params.id });

        if (! data) {
            res.status(400).send('No File Assigned With That Id');
            return;
        }

        await Data.deleteOne({ _id: req.params.id });

        fs.unlink(data.path, (err) => {
            if (err) {
                res.status(400).send('File Delete Process Is Failed');
                return;
            }

            res.status(200).send('File Deleted Successfully');
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const searchTopFive = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: IData | null = await Data.findOne({ _id: req.params.id });

        if (! data) {
            res.status(400).send('No File Assigned With That Id');
            return;
        }

        const findMostFrequent = (str: string, num: number) => {
            const stickyWords: Array<string> = [
                'the', 'is', 'by', 'at', 'and',
                'so', 'if', 'but', 'in', 'on',
                'the', 'was', 'for','that', 'a',
                'an', 'or', 'of', 'to', 'be',
                'are', 'it', 'were', 'had', 'i',
            ];
            const strArr: string[] = str.toLowerCase().split(' ');
            const map: any = {};

            strArr.forEach(word => {
            if (! stickyWords.includes(word)) {
                if (map.hasOwnProperty(word)) map[word]++;
                map[word] = 1;
            }
        });
            const frequencyArr = Object.keys(map).map(key => [key, map[key]]);
            frequencyArr.sort((a, b) => b[1] - a[1]);

            return frequencyArr.slice(0, num).map(el => el[0]);
        };

        let text: string = data.content.reduce((acc, curr: { text: string }) => acc + curr.text, '');
        let occur: Array<string> = findMostFrequent(text, 5);

        res.send(occur);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    };
};  

const searchWord = async (req: Request, res: Response): Promise<void> => {
    try {
        if (req.params.word.trim().split(' ').length > 1) {
            res.status(400).send('Word Parameter Should Be Only One Word');
            return;
        }

        const searchKeyword: string = req.params.word;
        const data = await Data.aggregate([
            { $match: { 'content.text': { $regex: searchKeyword, $options: 'i' } } },
            { $unwind: '$content' },
            { $match: { 'content.text': { $regex: searchKeyword, $options: 'i' } } },
            {
            $group: {
                _id: '$_id',
                id: { $first: '$_id' },
                text: { $push: '$content.text' },
            },
            },
            { $project: { _id: 0, id: 1, text: 1 } },
        ]);

        if (! data || ! Array.isArray(data) || data.length === 0) {
            res.status(400).send('This Word Does Not Exist In Any File');
            return;
        }

        res.send(data);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    };
};

const searchWordCount = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: IData | null = await Data.findOne({ _id: req.body.id });
        
        if (! data) {
            res.status(400).send('No File Assigned With That Id');
            return;
        }
        
        const findMatches = (text: string, word: string) => {
            const regex: RegExp = new RegExp(`\\b${word}\\b`, 'gi');
            const matches: RegExpMatchArray | null = text.match(regex);
            return matches ? matches : [];
        };
        
        const keyword: string = req.body.keyword;
        const matchingTexts: string[] = [];
        data.content.forEach((c: { text: string }) => {
            const matches = findMatches(c.text, keyword);
            if (matches.length > 0) {
                matchingTexts.push(c.text);
            }
        });
        const frequency: number = matchingTexts.length;

        if (! frequency || frequency === 0) {
            res.status(400).send('This Keyword Does Not Mentioned In This File');
            return;
        }
        
        res.send({ frequency, matchingTexts });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    };    
};

const searchPageImage = async (req: Request, res: Response): Promise<void> => {
    try {
        if (typeof req.body.id !== 'number' && typeof req.body.page !== 'number') {
            res.status(400).send('The Id And Page Number Should Be Numeric');
            return;
        }

        const data: IData | null = await Data.findOne({ _id: req.body.id });

        if (! data) {
            res.status(400).send('No File Assigned With That Id');
            return;
        }

        const text: string = (data.content[(req.body.page - 1)] as { text: string }).text;

        if (! text) {
            res.status(400).send(`There's No Page With Index ${req.body.page}`);
            return;
        }

        const canvas: Canvas = createCanvas(700, 300);
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

        ctx.font = '15px Arial';

        // Wrap and resize the text and image width
        const words: Array<string> = text.split(' ');
        const maxLineWidth: number = canvas.width - 20;
        let currentLine: string = '';
        let yOffset: number = 30;

        for (const word of words) {
            const testLine: string = currentLine.length > 0 ? `${currentLine} ${word}` : word;
            const testWidth: number = ctx.measureText(testLine).width;
            if (testWidth > maxLineWidth) {
                ctx.fillText(currentLine, 10, yOffset);
                currentLine = word;
                yOffset += 20;
            } else {
                currentLine = testLine;
            }
        }

        ctx.fillText(currentLine, 10, yOffset);

        const buffer: Buffer = canvas.toBuffer();
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': buffer.length
        });

        res.end(buffer);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const searchSentences = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: IData | null  = await Data.findOne({ _id: req.params.id });

        if (! data) {
            res.status(400).send('No File Assigned With That Id');
            return;
        }

        const texts: Array<string> = data.content;

        res.send(texts);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
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
