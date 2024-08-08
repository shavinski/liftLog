// src/routes/userRoutes.ts
import express from 'express';
const userRouter = express.Router();

import { validateData } from '../middleware/validationMiddleware';

import {
    userCreateAccountPart1,
    userCreateAccountPart2,
    userCreateAccountPart3,
    userCreateAccountPart4,
    userCreateAccountPart5
} from '../schemas/userSchemas';


import {
    getAllUsersTest,
    registerUserPart1,
    registerUserPart2,
    registerUserPart3,
    registerUserPart4,
    registerUserPart5
} from './userController';

// Currently meant as a way to test that database is working and sending infos
userRouter.get('/all', getAllUsersTest);

userRouter.post('/create/account/part-1-user-information', validateData(userCreateAccountPart1), registerUserPart1);
userRouter.post('/create/account/part-2-height-weight', validateData(userCreateAccountPart2), registerUserPart2);
userRouter.post('/create/account/part-3-body-type', validateData(userCreateAccountPart3), registerUserPart3);
userRouter.post('/create/account/part-4-goal', validateData(userCreateAccountPart4), registerUserPart4);
userRouter.post('/create/account/part-5-final-account-information', validateData(userCreateAccountPart5), registerUserPart5);

// userRouter.post('/login', validateData(userLoginSchema), loginUser);

export default userRouter;