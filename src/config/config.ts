import { getEnv, getEnvAsEnum, getEnvAsInteger } from '../utils/env';

type NodeEnv = 'development' | 'production' | 'test';

// Safely parse the environment variables to their correct types and ensure they are loaded
export const NODE_ENV: NodeEnv = getEnvAsEnum('NODE_ENV', ['development', 'production', 'test']);
export const PORT: number = getEnvAsInteger('PORT');
export const REDIS_HOST: string = getEnv('REDIS_HOST');
export const REDIS_PORT: number = getEnvAsInteger('REDIS_PORT');

export const env = { NODE_ENV, PORT, REDIS_HOST, REDIS_PORT };

