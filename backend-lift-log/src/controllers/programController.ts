"use strict";

import { Request, Response } from 'express';
import Program from '../models/program';

export const getUserWorkoutPrograms = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user.userId
        const programs = await Program.getAllUserPrograms(userId);
        res.status(200).json({ programs });
    } catch (err) {
        res.status(400).send("Not able to find workout programs")
    }
}

export const getSingleUserProgram = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const program = await Program.getSingleUserProgram(id);
        res.status(200).json({ program })
    } catch (err) {
        res.status(400).send("Not able to find this workout program")
    }
}

