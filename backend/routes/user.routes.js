import express from 'express';
const userRouter = express.Router();
import { registrationUser,loginUser } from '../controllers/user.controllers.js';
import { validateLogin, validateRegistration } from '../middlewares/auth.middleware.js';

userRouter.post('/registration', validateRegistration, registrationUser);
userRouter.post('/login', validateLogin, loginUser);

export default userRouter;