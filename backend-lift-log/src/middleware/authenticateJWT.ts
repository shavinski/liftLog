"use strict";

import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers?.authorization;

    if (!authHeader) {
        throw new UnauthorizedError({ messages: ["Authorization header is missing"] })
    }

    // Singles out token and leaves out the Bearer or bearer 
    const userToken = authHeader.split(' ')[1];

    try {
        res.locals.user = jwt.verify(userToken, SECRET_KEY);
        next();
    } catch (err) {
        throw new UnauthorizedError({messages: ["Invalid or expired token"]})
    }
};
