import { rateLimit } from 'express-rate-limit';
import { redisClient } from '../config/redis';
import { RedisStore } from 'rate-limit-redis';

export const createGlobalRateLimiter = () => {
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15-minutes
      max: 100, // limit each IP to 100 requests per window
      message: 'Too many requests, please try again later.',
      store: new RedisStore({
        sendCommand: (...args: string[]) => redisClient.sendCommand(args),
        prefix: 'rate-limit:',
      }),
    });
  };