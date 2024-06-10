// src/routes/userRoutes.ts
import express from 'express';
const userRouter = express.Router();

import { validateData } from '../middleware/validationMiddleware';

import {
    userCreateAccountSchema,
    userCreateAccountPart1,
    userCreateAccountPart2,
    userCreateAccountPart3
} from '../schemas/userSchemas';


import {
    registerUserFinal,
    registerUserPart1,
    registerUserPart2,
    registerUserPart3
} from './userController';

userRouter.post('/create/account/part-1-user-information', validateData(userCreateAccountPart1), registerUserPart1);
userRouter.post('/create/account/part-2-height-weight', validateData(userCreateAccountPart2), registerUserPart2);
userRouter.post('/create/account/part-3-body-type', validateData(userCreateAccountPart3), registerUserPart3);
userRouter.post('/create/account', validateData(userCreateAccountSchema), registerUserFinal);

// userRouter.post('/login', validateData(userLoginSchema), loginUser);

export default userRouter;