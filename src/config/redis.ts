import { createClient } from 'redis';
import { REDIS_HOST, REDIS_PORT } from './config';
import { logger } from '../utils/logger';

export const redisClient = createClient({
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
    },
});


redisClient.on('error', (err) => logger.error('Redis Client Error', err));

export const connectRedis = async () => {
    try {
      await redisClient.connect();
      logger.info('Connected to Redis');
    } catch (error) {
      logger.error(`Failed to connect to Redis: ${error}`);
    }
  };
  