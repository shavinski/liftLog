import { Request, Response } from 'express';
import User from '../models/user';


export const registerUserPart1 = async (req: Request, res: Response) => {
    try {
        const info = await User.validatePartOneForm(req.body);
        res.status(200).json({ message: "Part 1 success", info })
    } catch (error: any) {
        res.status(400).json({ error: 'Invalid data', message: error.messages });
    }
};

export const registerUserPart2 = async (req: Request, res: Response) => {
    try {
        await User.validatePartTwoForm(req.body);
        res.status(200).json({ message: "Part 2 success" })
    } catch (error: any) {
        res.status(400).json({ error: 'Invalid data', message: error.messages });
    }
};

export const registerUserPart3 = async (req: Request, res: Response) => {
    try {
        await User.validatePartThreeForm(req.body);
        res.status(200).json({ message: "Part 3 success" })
    } catch (error: any) {
        res.status(400).json({ error: 'Invalid data', message: error.messages });
    }
};

export const registerUserPart4 = async (req: Request, res: Response) => {
    try {
        await User.validatePartFourForm(req.body);
        res.status(200).json({ message: "Part 4 success" })
    } catch (error: any) {
        res.status(400).json({ error: 'Invalid data', messages: error.messages });
    }
};

export const registerUserPart5 = async (req: Request, res: Response) => {
    try {
        const user = await User.validatePartFiveForm(req.body);
        res.status(200).json({ message: "Part 5 success", user })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ error: 'Invalid data', messages: error.messages });
    }
};
