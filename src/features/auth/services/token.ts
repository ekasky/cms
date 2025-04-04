import jwt, { SignOptions } from 'jsonwebtoken';
import ms from 'ms';
import { ACCESS_TOKEN_EXPIRES_IN, JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN } from '../../../config/config';
import { redisClient } from '../../../config/redis';
import { randomUUID } from 'crypto';

const REFRESH_TOKEN_PREFIX: string = 'refresh_token:';

type TokenKey = 'access' | 'refresh';

interface TokenPayload {
    id: string;
    email: string;
};

interface RefreshTokenPayload extends TokenPayload {
    tokenId: string;
};

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

export const generateTokens = async (payload: TokenPayload): Promise<{accessToken: string, refreshToken: string}> => {

    // Generate a UUID for the refresh token to be used as a identifier
    const tokenId: string = randomUUID();

    // Generate the tokens
    const accessToken: string = signToken(payload, 'access');
    const refreshToken: string = signToken({ ...payload, tokenId }, 'refresh');

    const expiresInSeconds = Math.floor(ms(REFRESH_TOKEN_EXPIRES_IN) / 1000);

    // Save the refresh token *id* (not the full token) to Redis for revocation
    await redisClient.set(REFRESH_TOKEN_PREFIX + tokenId, 'true', { EX: expiresInSeconds });

    // return the tokens
    return { accessToken, refreshToken }

};
