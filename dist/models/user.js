import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});
export default mongoose.model('User', schema);
//# sourceMappingURL=user.js.map