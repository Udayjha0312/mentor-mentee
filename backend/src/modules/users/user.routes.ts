import { Router } from 'express';
import { UserController } from './user.controller';
import { protect } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { updateProfileSchema } from './user.validation';

const router = Router();

router.get('/me', protect, UserController.getProfile);
router.patch('/me', protect, validate(updateProfileSchema), UserController.updateProfile);

export default router;
