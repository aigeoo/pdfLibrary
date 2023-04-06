import express from 'express';
import { register, login } from '../controllers/authController.js';
const authRouter = express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
export { authRouter };
//# sourceMappingURL=auth.js.map