import jwt from 'jsonwebtoken';
import { createAccountData } from '../models/user';
import { SECRET_KEY } from '../config';

export function createToken(user: createAccountData ) {
    let payload = {
        username: user.username,
        isAdmin: user.isAdmin || false,
    }

    return jwt.sign(payload, SECRET_KEY);
}