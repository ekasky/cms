import { getEnv, getEnvAsEnum, getEnvAsInteger } from '../utils/env';
import { StringValue } from 'ms';

type NodeEnv = 'development' | 'production' | 'test';

// Safely parse the environment variables to their correct types and ensure they are loaded
export const NODE_ENV: NodeEnv = getEnvAsEnum('NODE_ENV', ['development', 'production', 'test']);
export const PORT: number = getEnvAsInteger('PORT');
export const REDIS_HOST: string = getEnv('REDIS_HOST');
export const REDIS_PORT: number = getEnvAsInteger('REDIS_PORT');
export const DB_USER: string = getEnv('DB_USER');
export const DB_PASSWORD: string = getEnv('DB_PASSWORD');
export const DB_DATABASE: string = getEnv('DB_DATABASE');
export const DB_HOST: string = getEnv('DB_HOST');
export const DB_PORT: number = getEnvAsInteger('DB_PORT');
export const JWT_ACCESS_TOKEN_SECRET: string = getEnv('JWT_ACCESS_TOKEN_SECRET');
export const JWT_REFRESH_TOKEN_SECRET: string = getEnv('JWT_REFRESH_TOKEN_SECRET');
export const ACCESS_TOKEN_EXPIRES_IN: StringValue = getEnv('ACCESS_TOKEN_EXPIRES_IN') as StringValue;
export const REFRESH_TOKEN_EXPIRES_IN: StringValue = getEnv('REFRESH_TOKEN_EXPIRES_IN') as StringValue;

export const env = { 
    NODE_ENV, 
    PORT, 
    REDIS_HOST, 
    REDIS_PORT,
    DB: {
        DB_USER, 
        DB_PASSWORD, 
        DB_DATABASE, 
        DB_HOST, 
        DB_PORT 
    },
    JWT: {
        JWT_ACCESS_TOKEN_SECRET,
        JWT_REFRESH_TOKEN_SECRET,
        ACCESS_TOKEN_EXPIRES_IN,
        REFRESH_TOKEN_EXPIRES_IN
    }
};

