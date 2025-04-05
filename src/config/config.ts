import { StringValue } from 'ms';
import { getEnv, getEnvAsEnum, getEnvAsInteger } from '../utils/env';
import { EmailProvider } from '../utils/emailService';

type NodeEnv = 'development' | 'production' | 'test';
type EmailProvier = 'RESEND';

// Safely parse the environment variables to their correct types and ensure they are loaded
export const NODE_ENV: NodeEnv = getEnvAsEnum('NODE_ENV', ['development', 'production', 'test']);
export const PORT: number = getEnvAsInteger('PORT');
export const FRONTEND_URL: string = getEnv('FRONTEND_URL');
export const BACKEND_URL: string = getEnv('BACKEND_URL');
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
export const EMAIL_PROVIDER: EmailProvider = getEnvAsEnum('EMAIL_PROVIDER', ['RESEND']) as EmailProvider;
export const RESEND_API_KEY: string = getEnv('RESEND_API_KEY');
export const EMAIL_DOMAIN: string = getEnv('EMAIL_DOMAIN');

export const env = { 
    NODE_ENV, 
    PORT, 
    FRONTEND_URL,
    BACKEND_URL,
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
    },
    EMAIL: {
        EMAIL_PROVIDER,
        RESEND_API_KEY,
        EMAIL_DOMAIN
    }
};

