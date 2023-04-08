import { Request, Response } from 'express';
import User from '../models/user.js';
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    let error: string | undefined = validator(res, username, password);

    if (error) {
        return res.status(401).send(error);
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).send('Username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username: username, password: hashedPassword });
    try {
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).send('Bad Request');
    }
};

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    let error: string | undefined = validator(res, username, password);

    if (error) {
        return res.status(401).send(error);
    }

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Authentication Failed');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Authentication Failed');
        }
        const token = Buffer.from(`${username}:${user.password}`).toString('base64');
        res.json({ token });
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    };
};

function validator(res: Response, username: string, password: string): string | undefined
{
    let message: string;
    if (!password || !username) {
        return message = 'Username & Password are required';
    }

    const usernameRegex = /^[a-zA-Z0-9_$%@\!&]+$/;
    const passwordRegex = /^.{8,16}$/;
    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
        return message = 'Invalid username or password';
    }
}

export { register, login };
