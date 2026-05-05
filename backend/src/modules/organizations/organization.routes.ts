import { Router } from 'express';
import { OrganizationController } from './organization.controller';
import { protect } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { createOrganizationSchema } from './organization.validation';

const router = Router();

router.get('/me', protect, OrganizationController.getProfile);
router.post('/', protect, validate(createOrganizationSchema), OrganizationController.create);

export default router;
