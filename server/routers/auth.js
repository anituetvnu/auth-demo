import { Router } from 'express';
import { authController } from '../http/controllers';
import { auth } from '../http/middlewares';

const router = Router();

router.get('/me', auth, authController.me);
router.post('/sign-in', authController.signIn);
router.post('/sign-up', authController.signUp);

export default router;
