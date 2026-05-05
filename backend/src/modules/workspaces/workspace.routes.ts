import { Router } from 'express';
import { WorkspaceController } from './workspace.controller';
import { protect } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { createWorkspaceSchema, inviteWorkspaceSchema, respondInvitationSchema } from './workspace.validation';
import { requireRole } from '../../middleware/roles';

const router = Router();

router.get('/', protect, WorkspaceController.list);
router.post('/', protect, requireRole(['ADMIN']), validate(createWorkspaceSchema), WorkspaceController.create);
router.get('/:workspaceId', protect, WorkspaceController.getWorkspace);
router.post('/:workspaceId/invite', protect, requireRole(['ADMIN', 'MENTOR']), validate(inviteWorkspaceSchema), WorkspaceController.invite);
router.post('/invitation/:token/respond', protect, validate(respondInvitationSchema), WorkspaceController.respondInvitation);

export default router;
