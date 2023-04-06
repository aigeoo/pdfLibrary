import express, { Application } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { authRouter } from './routes/auth.js';
import { dataRouter } from './routes/data.js';

dotenv.config();

const app: Application = express();
const port: number | string = process.env.PORT || 3000;
const dbUri: string = process.env.DB_URI || '';


mongoose
    .connect(dbUri)
    .then(() => console.log('Database is connected successfully...'))
    .catch((err) => console.error(`Database connection error: ${err}`));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/data', dataRouter);

app.listen(port, () => {
    console.log(`[Server]: I am running at http://localhost:${port}`);
});
