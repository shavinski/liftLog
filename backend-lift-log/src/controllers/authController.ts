"use strict";

import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { createToken } from '../helpers/tokens';

// TODO: Part 1 - Part 4 is all pointless, i had this from earlier trying to have a progress bar, goign to keep it here for now
// I am not even making a call to the backend to handle this data, probablt an issue, but I can handle this later
// 
// export const registerUserPart1 = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const info = await User.validatePartOneForm(req.body);
//         res.status(200).json({ message: "Part 1 success", info });
//     } catch (error: any) {
//         next(error);
//     }
// };

// // TODO: Decide if I want to even keep this, used this earlier to attempt progress bar with multi part form
// export const registerUserPart2 = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const info = User.validatePartTwoForm(req.body);
//         res.status(200).json({ message: "Part 2 success", info });
//     } catch (error: any) {
//         next(error);
//     }
// };

// // TODO: Decide if I want to even keep this, used this earlier to attempt progress bar with multi part form
// export const registerUserPart3 = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const info = await User.validatePartThreeForm(req.body);
//         res.status(200).json({ message: "Part 3 success", info });
//     } catch (error: any) {
//         next(error);
//     }
// };

// // TODO: Decide if I want to even keep this, used this earlier to attempt progress bar with multi part form
// export const registerUserPart4 = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const info = await User.validatePartFourForm(req.body);
//         res.status(200).json({ message: "Part 4 success", info });
//     } catch (error: any) {
//         next(error);
//     }
// };

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.signup({ ...req.body, isAdmin: false });
        const token = createToken(user);
        return res.status(200).json({ message: "Sign up success", token });
    } catch (error: any) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.login({ ...req.body });
        const token = createToken(user);
        return res.status(200).json({ message: "Log in success", token });
    } catch (err: any) {
        next(err);
    }
};