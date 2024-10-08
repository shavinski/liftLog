// src/routes/userRoutes.ts
import express from 'express';
const userRouter = express.Router();

import {
    getAllUsersTest,
    getSingleUserData,
} from '../controllers/userController';

userRouter.get('/all', getAllUsersTest);
userRouter.get('/:username', getSingleUserData);


export default userRouter;