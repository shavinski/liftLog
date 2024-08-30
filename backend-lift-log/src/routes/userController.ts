import { Request, Response } from 'express';
import User from '../models/user';
import { createToken } from '../helpers/tokens';


export const getAllUsersTest = async(req: Request, res: Response) => {
    try {
        const result = await User.getAllUsers();
        res.json(result);
    } catch (err) {
        res.status(400).send('Cannot find this source');
    }
}

export const getSingleUserData = async(req: Request, res: Response) => {
    try {
        const user = await User.getSingleUserData(req.params.username);
        return res.json({user});
    } catch (err) {
        res.status(400).send("User not found");
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const user = await User.login({...req.body});
        const token = createToken(user);
        return res.status(200).json({ message: "Log in success", token})
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ error: 'Invalid data', messages: error.messages });
    }
};


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

export const signup = async (req: Request, res: Response) => {
    try {
        const user = await User.signup({...req.body, isAdmin: false});
        const token = createToken(user);
        return res.status(200).json({ message: "Sign up success", token})
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ uhoh: "uhoh", error: 'Invalid data', messages: error.messages });
    }
};
