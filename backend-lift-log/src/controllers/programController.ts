import { Request, Response } from 'express';
import Program from '../models/program';

export const getAllPrograms = async (req: Request, res: Response) => {
    try {
        // Will take the userId as an input in order to get all programs
        const info = await Program.getAllPrograms(2);
        res.json(info);
    } catch (err) {
        res.status(400).send("Not able to find programs")
    }
}

