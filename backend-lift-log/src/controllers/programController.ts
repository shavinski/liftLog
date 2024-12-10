"use strict";

import { NextFunction, Request, Response } from 'express'
import Program from '../models/program';

export const getUserWorkoutPrograms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.user.userId
        const programs = await Program.getAllUserPrograms(userId);
        res.status(200).json({ programs });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export const getSingleUserProgram = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id)
        const program = await Program.getSingleUserProgram(id);
        res.status(200).json({ program })
    } catch (error) {
        console.log(error)
        next(error);
    }
}

