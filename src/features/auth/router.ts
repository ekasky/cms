import { Router } from 'express';
import { testController } from './controller';

const router: Router = Router();

router.get('/', testController);

export default router;