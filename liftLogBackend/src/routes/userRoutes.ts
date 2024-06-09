// src/routes/userRoutes.ts
import express from 'express';
import { validateData } from '../middleware/validationMiddleware';

import { userCreateAccountSchema } from '../schemas/userSchemas';

const userRouter = express.Router();

import { registerUserFinal } from './userController';

userRouter.post('/create/account', validateData(userCreateAccountSchema), registerUserFinal);
userRouter.post('/create/account/part-1-user-information', validateData(userCreateAccountSchema), registerUserFinal);

// userRouter.post('/login', validateData(userLoginSchema), loginUser);

export default userRouter;