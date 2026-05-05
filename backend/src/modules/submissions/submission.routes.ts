import { Router } from 'express';
import { SubmissionController } from './submission.controller';
import { protect } from '../../middleware/auth';
import { requireRole } from '../../middleware/roles';
import { validate } from '../../middleware/validate';
import { submitTaskSchema, reviewTaskSchema } from './submission.validation';

const router = Router();

router.post('/submit', protect, requireRole(['MENTEE']), validate(submitTaskSchema), SubmissionController.submit);
router.post('/review', protect, requireRole(['MENTOR']), validate(reviewTaskSchema), SubmissionController.review);

export default router;
