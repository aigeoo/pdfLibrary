import mongoose from 'mongoose';
const schema = new mongoose.Schema({
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
export default mongoose.model('Data', schema);
//# sourceMappingURL=data.js.map