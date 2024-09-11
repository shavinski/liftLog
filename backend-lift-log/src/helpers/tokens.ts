import jwt from 'jsonwebtoken';
import { LoginData, SignupData } from '../models/user';
import { SECRET_KEY } from '../config';

interface LoginToken {
    username: string,
    isAdmin: boolean
}

export function createToken(user: SignupData | LoginToken) {
    let payload = {
        username: user.username,
        isAdmin: user.isAdmin || false,
    }

    return jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
}