import express from 'express';
import { userLoginGet, userLoginPost } from '@controller/auth/login';
import { userSignupGet, userSignupPost } from '@controller/auth/signup';
import { resetPasswordGet, resetPasswordPost } from '@controller/auth/resetpassword';
import { userVerify } from '@controller/auth/verify';

const authRouter = express.Router();

authRouter.get("/login", userLoginGet);
authRouter.post("/login", userLoginPost);

authRouter.get('/signup', userSignupGet);
authRouter.post('/signup', userSignupPost);

authRouter.get('/resetpassword', resetPasswordGet);
authRouter.post('/resetpassword', resetPasswordPost);

authRouter.get('/verify/:verificationToken', userVerify);

export default authRouter;