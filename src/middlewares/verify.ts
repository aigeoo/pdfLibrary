import { Request, Response, NextFunction } from 'express';
import User from '../models/user.js';

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (! authHeader) {
        return res.status(401).send('Authentication Header Required');
    }

    const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
        .toString()
        .split(':');

    try {
        const user = await User.findOne({ username, password });

        if (! user) {
            return res.status(401).send('Authentication Failed');
        }

        next();
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

export { auth };
