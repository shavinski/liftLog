// src/routes/userRoutes.ts
import express from 'express';
import { validateData } from '../middleware/validationMiddleware';

import { userCreateAccountSchema } from '../schemas/userSchemas';

const userRouter = express.Router();

import { registerUser, sendDummyData } from './userController';

userRouter.get('/create/account', sendDummyData)
userRouter.post('/create/account', validateData(userCreateAccountSchema), registerUser);
// userRouter.post('/login', validateData(userLoginSchema), loginUser);

export default userRouter;