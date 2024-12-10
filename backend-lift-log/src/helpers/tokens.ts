"use strict";

import jwt from 'jsonwebtoken';
import { LoginData, SignupData } from '../models/user';
import { SECRET_KEY } from '../config';

interface LoginToken {
    username: string,
    isAdmin: boolean,
    userId?: number
}

export function createToken(user: SignupData | LoginToken | null): string {
    // TODO: Find a bette way to handle the try/catch and errors in my user model 
    if (!user) {
        throw new Error("No user, cannot create a token!")
    }

    let payload = {
        username: user.username,
        isAdmin: user.isAdmin || false,
        id: user.userId
    }

    return jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
}