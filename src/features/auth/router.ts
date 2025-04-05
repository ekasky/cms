import { Router } from 'express';
import { registerUserController } from './controller';
import { validate } from '../../middlewares/validate';
import { registerUserSchema } from './validators';
import { rateLimit } from 'express-rate-limit'; // Type import

export const createAuthRouter = (registerRateLimiter: ReturnType<typeof rateLimit>) => {

  const router: Router = Router();

  router.post('/register', registerRateLimiter, validate(registerUserSchema), registerUserController);

  return router;
  
};
