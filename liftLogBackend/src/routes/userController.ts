import { Request, Response } from 'express';
import User from '../models/user';

export const registerUserPart1 = async (req: Request, res: Response) => {
    try {
        await User.validatePartOneForm(req.body);
        res.json({ message: "Part 1 success" })
    } catch (error: any) {
        console.log(error.messages);
        res.status(400).json({ message: error.messages });
    }
}

export const registerUserPart2 = async (req: Request, res: Response) => {
    try {
        await User.validatePartTwoForm(req.body);
        res.json({ message: "Part 2 success" })
    } catch (error: any) {
        console.log(error.messages);
        res.status(400).json({ message: error.messages });
    }
}

export const registerUserFinal = async (req: Request, res: Response) => {
    // Handle user registration logic using validated data from req.body
    try {
        const data = await User.createAccount(req.body);
        res.json({ message: 'User registered successfully', data });
    } catch (error: any) {
        console.log("\n\n The sign up error ==============>", error.message, "\n\n\n");
        res.status(400).json({ message: error.message });
    }

};



// export const loginUser = (req: Request, res: Response) => {
//     // Handle user login logic using validated data from req.body
//     res.json({ message: 'User logged in successfully', data: req.body });
// };