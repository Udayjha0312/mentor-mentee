import { Router } from 'express';
import { MilestoneController } from './milestone.controller';
import { protect } from '../../middleware/auth';
import { requireRole } from '../../middleware/roles';
import { validate } from '../../middleware/validate';
import { createMilestoneSchema } from './milestone.validation';

const router = Router();

router.post('/', protect, requireRole(['ADMIN', 'MENTOR']), validate(createMilestoneSchema), MilestoneController.create);

export default router;
