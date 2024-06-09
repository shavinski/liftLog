// src/routes/userRoutes.ts
import express from 'express';
import { validateData } from '../middleware/validationMiddleware';

import { userCreateAccountSchema, userCreateAccountPart1 } from '../schemas/userSchemas';

const userRouter = express.Router();

import { registerUserFinal, registerUserPart1 } from './userController';

userRouter.post('/create/account/part-1-user-information', validateData(userCreateAccountPart1), registerUserPart1);
userRouter.post('/create/account', validateData(userCreateAccountSchema), registerUserFinal);

// userRouter.post('/login', validateData(userLoginSchema), loginUser);

export default userRouter;