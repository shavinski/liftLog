"use strict";

import jwt from 'jsonwebtoken';
import { LoginData, SignupData } from '../models/user';
import { SECRET_KEY } from '../config';

interface LoginToken {
    username: string,
    userId: number,
    isAdmin: boolean
}

export function createToken(user: SignupData | LoginToken | null): string {
    // TODO: Find a bette way to handle the try/catch and errors in my user model 
    if (!user) {
        throw new Error("No user, cannot create a token!")
    }

    let payload = {
        username: user.username,
        userId: user.userId,
        isAdmin: user.isAdmin || false,
    }

    return jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
}