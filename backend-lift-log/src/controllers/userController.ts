"use strict";

import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import User from '../models/user';

export const getAllUsersTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await User.getAllUsers();
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

export const getSingleUserData = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params

    if (!username) {
        throw new BadRequestError()
    }

    try {
        const user = await User.getSingleUserData(username);
        return res.status(200).json({ user });
    } catch (error) {
        next(error)
    }
}


