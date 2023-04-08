var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/user.js';
import bcrypt from "bcrypt";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const usernameRegex = /^[a-zA-Z0-9_$%@\!&]+$/;
    const passwordRegex = /^.{8,16}$/;
    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
        return res.status(400).send('Invalid username or password');
    }
    const existingUser = yield User.findOne({ username });
    if (existingUser) {
        return res.status(400).send('Username already exists');
    }
    const salt = yield bcrypt.genSalt(10);
    const hashedPassword = yield bcrypt.hash(password, salt);
    const user = new User({ username: username, password: hashedPassword });
    try {
        yield user.save();
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).send('Bad Request');
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        let user = yield User.findOne({ username });
        if (!user) {
            return res.status(401).send('Authentication Failed');
        }
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Authentication Failed');
        }
        const token = Buffer.from(`${username}:${user.password}`).toString('base64');
        res.json({ token });
    }
    catch (error) {
        return res.status(500).send('Internal Server Error');
    }
    ;
});
export { register, login };
//# sourceMappingURL=authController.js.map