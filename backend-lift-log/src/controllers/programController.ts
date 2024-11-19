import { Request, Response } from 'express';
import Program from '../models/program';

export const getAllProgramsSingleUser = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user.userId
        const programs = await Program.getAllPrograms(userId);
        res.json({ programs });
    } catch (err) {
        res.status(400).send("Not able to find programs")
    }
}

