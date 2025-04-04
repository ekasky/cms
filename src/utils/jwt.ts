import jwt, { SignOptions } from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRES_IN, JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN } from '../config/config';

type TokenKey = 'access' | 'refresh';

export const signToken = (payload: object, key: TokenKey, options?: SignOptions) => {

    const tokenSecret = key === 'access' ? JWT_ACCESS_TOKEN_SECRET : JWT_REFRESH_TOKEN_SECRET;
    const expiresIn = key === 'access' ? ACCESS_TOKEN_EXPIRES_IN : REFRESH_TOKEN_EXPIRES_IN;

    const signOptions: SignOptions = {
        ...options,
        expiresIn
    };

    return jwt.sign(payload, tokenSecret, signOptions);
};

export const verifyToken = <T>(token: string, key: TokenKey): T | null => {

    try {

        const tokenSecret: string = key === 'access' ? JWT_ACCESS_TOKEN_SECRET : JWT_REFRESH_TOKEN_SECRET;
        return jwt.verify(token, tokenSecret) as T;

    } catch(error) {
        return null;
    }

};