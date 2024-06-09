import { Request, Response } from 'express';
import User from '../models/user';

export const registerUser = (req: Request, res: Response) => {
    // Handle user registration logic using validated data from req.body
    User.createAccount(req.body);
    res.json({ message: 'User registered successfully', data: req.body });
};

export const sendDummyData = async (req: Request, res: Response) => {
    const users = await User.getAllUsers();
    res.json({ users });
}
// export const loginUser = (req: Request, res: Response) => {
//     // Handle user login logic using validated data from req.body
//     res.json({ message: 'User logged in successfully', data: req.body });
// };