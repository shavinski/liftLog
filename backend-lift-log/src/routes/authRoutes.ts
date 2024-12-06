"use strict";

// src/routes/userRoutes.ts
import express from 'express';
const authRouter = express.Router();

import { validateData } from '../middleware/validationMiddleware';

import {
    userCreateAccountPart1,
    userCreateAccountPart2,
    userCreateAccountPart3,
    userCreateAccountPart4,
    userCreateAccountPart5,
    userLoginSchema,
} from '../schemas/userSchemas';

// import {
//     registerUserPart1,
//     registerUserPart2,
//     registerUserPart3,
//     registerUserPart4,
//     signup,
//     login
// } from '../controllers/authController';

import {
    signup,
    login
} from '../controllers/authController';


authRouter.post('/signup', validateData(userCreateAccountPart5), signup);
authRouter.post('/login', validateData(userLoginSchema), login);

export default authRouter;