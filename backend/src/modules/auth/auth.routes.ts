import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middleware/validate';
import { signupSchema, loginSchema } from './auth.validation';
import { protect } from '../../middleware/auth';

const router = Router();

router.post('/signup', validate(signupSchema), AuthController.signup);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/demo-login', AuthController.demoLogin);
router.get('/me', protect, AuthController.getProfile);

export default router;
