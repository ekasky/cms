import { Router } from 'express';
import { registerUserController } from './controller';

const router: Router = Router();

router.post('/register', registerUserController);

export default router;