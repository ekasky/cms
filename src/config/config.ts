import { getEnvAsEnum, getEnvAsInteger } from '../utils/env';

type NodeEnv = 'development' | 'production' | 'test';

// Safely parse the environment variables to their correct types and ensure they are loaded
export const NODE_ENV: NodeEnv = getEnvAsEnum('NODE_ENV', ['development', 'production', 'test']);
export const PORT: number = getEnvAsInteger('PORT');

export const env = { NODE_ENV, PORT };

