import mongoose, { Schema, Document } from 'mongoose';

export interface IData extends Document {
    _id: number;
    name: string;
    created_at: string;
    pages: number;
    path: string;
    size: number;
    content: [];
}

const schema: Schema = new mongoose.Schema({
    _id: {
        type: Number, required: true
    },
    name: {
        type: String, required: true
    },
    created_at: {
        type: Date,
        default: () => new Date().toLocaleString(),
        required: true
    },
    pages: {
        type: Number, required: true
    },
    path: {
        type: String, required: true
    },
    size: {
        type: Number, required: true
    },
    content: Array,
});

export default mongoose.model<IData>('Data', schema);
