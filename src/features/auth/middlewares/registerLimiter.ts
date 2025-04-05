import { rateLimit } from 'express-rate-limit';
import { redisClient } from '../../../config/redis';
import { RedisStore } from 'rate-limit-redis';

export const createRegisterLimiter = () => {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                  // Much stricter for register
    message: 'Too many registration attempts, please try again later.',
    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
      prefix: 'rate-limit:register:',
    }),
  });
};
