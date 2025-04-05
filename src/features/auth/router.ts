import { Router } from 'express';
import { registerUserController } from './controller';
import { validate } from '../../middlewares/validate';
import { registerUserSchema } from './validators';

const router: Router = Router();

router.post('/register', validate(registerUserSchema), registerUserController);

export default router;