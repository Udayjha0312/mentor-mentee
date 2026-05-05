import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { WorkspaceService } from './workspace.service';
import { ApiError } from '../../utils/errors';

export class WorkspaceController {
  static async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const organizationId = req.user.organization;
      const { name, description } = req.body;
      const workspace = await WorkspaceService.create(organizationId, name, description);
      res.status(201).json({ success: true, data: workspace });
    } catch (error) {
      next(new ApiError((error as Error).message, 400));
    }
  }

  static async getWorkspace(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const workspace = await WorkspaceService.getById(req.params.workspaceId);
      if (!workspace) return next(new ApiError('Workspace not found', 404));
      res.json({ success: true, data: workspace });
    } catch (error) {
      next(new ApiError((error as Error).message, 500));
    }
  }

  static async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const organizationId = req.user.organization;
      const workspaces = await WorkspaceService.listByOrganization(organizationId);
      res.json({ success: true, data: workspaces });
    } catch (error) {
      next(new ApiError((error as Error).message, 500));
    }
  }

  static async invite(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { workspaceId } = req.params;
      const { email, role } = req.body;
      const invitation = await WorkspaceService.invite(workspaceId, req.user._id, email, role);
      res.status(201).json({ success: true, data: invitation });
    } catch (error) {
      next(new ApiError((error as Error).message, 400));
    }
  }

  static async respondInvitation(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { token } = req.params;
      const { status } = req.body;
      const invitation = await WorkspaceService.respondInvitation(token, status, req.user?._id);
      res.json({ success: true, data: invitation });
    } catch (error) {
      next(new ApiError((error as Error).message, 400));
    }
  }
}
