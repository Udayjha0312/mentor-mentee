import { Router } from 'express';
import { DashboardController } from './dashboard.controller';
import { protect } from '../../middleware/auth';
import { requireRole } from '../../middleware/roles';

const router = Router();

router.get('/admin', protect, requireRole(['ADMIN']), DashboardController.admin);
router.get('/mentor', protect, requireRole(['MENTOR']), DashboardController.mentor);
router.get('/mentee', protect, requireRole(['MENTEE']), DashboardController.mentee);

export default router;
