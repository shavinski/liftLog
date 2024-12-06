"use strict";

import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { Request, Response, NextFunction } from 'express';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers?.authorization;

    if (!authHeader) {
        res.status(401).json({ error: "Authorization header is missing" })
        return;
    }

    // Singles out token and leaves out the Bearer or bearer 
    const userToken = authHeader.split(' ')[1];

    try {
        res.locals.user = jwt.verify(userToken, SECRET_KEY);
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid or expired token" })
        return;
    }
};
