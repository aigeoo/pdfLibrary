import express, { Router } from 'express';
import { register, login } from '../controllers/authController.js';

const authRouter: Router = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export { authRouter };
