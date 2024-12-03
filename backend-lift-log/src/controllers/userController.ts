"use strict";

import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../middleware/BadRequestError';
import User from '../models/user';

export const getAllUsersTest = async (req: Request, res: Response) => {
    try {
        const result = await User.getAllUsers();
        res.json(result);
    } catch (err) {
        res.status(400).send('Cannot find this source');
    }
}

export const getSingleUserData = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params

    if (!username) {
        throw new BadRequestError({ code: 400, message: "Username is required!", logging: true })
    }

    try {
        const user = await User.getSingleUserData(username);
        return res.json({ user });
    } catch (err) {
        console.error(err)
        next(err)
    }
}


