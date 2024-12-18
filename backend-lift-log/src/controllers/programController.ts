"use strict";

import { NextFunction, Request, Response } from 'express'
import Program from '../models/program';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { BadRequestError } from '../errors/BadRequestError';

export const getUserWorkoutPrograms = async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user.id

    if (!userId) throw new UnauthorizedError({ messages: ["No user id was supplied"] });

    try {
        const programs = await Program.getAllUserPrograms(userId);
        res.status(200).json({ programs });
    } catch (error) {
        next(error);
    }
}

export const getSingleUserProgram = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)

    if (!id) throw new BadRequestError({ messages: ["A non-valid program id was supplied."] })

    try {
        const program = await Program.getSingleUserProgram(id);
        res.status(200).json({ program })
    } catch (error) {
        next(error);
    }
}

