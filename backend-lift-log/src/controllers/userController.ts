import { Request, Response } from 'express';
import User from '../models/user';

export const getAllUsersTest = async (req: Request, res: Response) => {
    try {
        const result = await User.getAllUsers();
        res.json(result);
    } catch (err) {
        res.status(400).send('Cannot find this source');
    }
}

export const getSingleUserData = async (req: Request, res: Response) => {
    try {
        const { username } = req.body
        const user = await User.getSingleUserData(username);
        return res.json({ user });
    } catch (err) {
        // res.status(400).send("User not found");
        throw new Error("Name is required")
    }
}


