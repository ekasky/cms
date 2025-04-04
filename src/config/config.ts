import { getEnv, getEnvAsEnum, getEnvAsInteger } from '../utils/env';

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
    } 
};

