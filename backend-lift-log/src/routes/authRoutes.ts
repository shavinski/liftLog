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


import {
    registerUserPart1,
    registerUserPart2,
    registerUserPart3,
    registerUserPart4,
    signup,
    login
} from '../controllers/authController';


// Handling multi step form 
authRouter.post('/part-1', validateData(userCreateAccountPart1), registerUserPart1);
authRouter.post('/part-2', validateData(userCreateAccountPart2), registerUserPart2);
authRouter.post('/part-3', validateData(userCreateAccountPart3), registerUserPart3);
authRouter.post('/part-4', validateData(userCreateAccountPart4), registerUserPart4);
authRouter.post('/signup', validateData(userCreateAccountPart5), signup);

authRouter.post('/login', validateData(userLoginSchema), login);

export default authRouter;