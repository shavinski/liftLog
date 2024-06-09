// src/routes/userRoutes.ts
import express from 'express';
import { validateData } from '../middleware/validationMiddleware';

import { userCreateAccountSchema, userCreateAccountPart1, userCreateAccountPart2 } from '../schemas/userSchemas';

const userRouter = express.Router();

import { registerUserFinal, registerUserPart1, registerUserPart2 } from './userController';

userRouter.post('/create/account/part-1-user-information', validateData(userCreateAccountPart1), registerUserPart1);
userRouter.post('/create/account/part-2-height-weight', validateData(userCreateAccountPart2), registerUserPart2);
userRouter.post('/create/account', validateData(userCreateAccountSchema), registerUserFinal);

// userRouter.post('/login', validateData(userLoginSchema), loginUser);

export default userRouter;