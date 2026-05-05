import { Router } from 'express';
import { TaskController } from './task.controller';
import { protect } from '../../middleware/auth';
import { requireRole } from '../../middleware/roles';
import { validate } from '../../middleware/validate';
import { createTaskSchema, updateTaskStatusSchema } from './task.validation';

const router = Router();

router.get('/:taskId', protect, TaskController.getTask);
router.post('/', protect, requireRole(['ADMIN', 'MENTOR']), validate(createTaskSchema), TaskController.create);
router.patch('/:taskId/status', protect, validate(updateTaskStatusSchema), TaskController.updateStatus);

export default router;
