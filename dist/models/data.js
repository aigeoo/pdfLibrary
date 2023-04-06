import mongoose from 'mongoose';
const schema = new mongoose.Schema({
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
export default mongoose.model('Data', schema);
//# sourceMappingURL=data.js.map