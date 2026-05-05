import { Router } from 'express';
import { ProjectController } from './project.controller';
import { protect } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { createProjectSchema } from './project.validation';
import { requireRole } from '../../middleware/roles';

const router = Router();

router.get('/', protect, ProjectController.list);
router.get('/:projectId', protect, ProjectController.getProject);
router.post('/', protect, requireRole(['ADMIN', 'MENTOR']), validate(createProjectSchema), ProjectController.create);

export default router;
