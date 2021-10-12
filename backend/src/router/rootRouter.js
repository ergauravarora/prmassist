import { Router } from 'express';
import AuthService from '../services/AuthService.js';
import AuthRoute from './authRouter.js';
import ReviewRoute from './reviewRouter.js';
import UserRoute from './userRouter.js';

let rootRouter = Router();

rootRouter.use('/user', UserRoute);
rootRouter.use('/review', ReviewRoute);
rootRouter.use('/auth', AuthRoute);


export default rootRouter;