import mongoose, { Schema, Document } from 'mongoose';

export interface IData extends Document {
    id: number;
    fileName: string;
    created_at: Date;
    pages: number;
    fileSize: number;
    content: [
        {
            index: number;
            text: string;
        }
    ];
}

const schema: Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    fileName: { type: String, required: true },
    created_at: { type: Date, required: true },
    pages: { type: Number, required: true },
    fileSize: { type: Number, required: true },
    content: [
        {
            index: { type: Number, required: true },
            text: { type: String, required: true },
        },
    ],
});

export default mongoose.model<IData>('Data', schema);
