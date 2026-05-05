import { Request, Response, NextFunction } from 'express';
import { ProjectService } from './project.service';
import { ApiError } from '../../utils/errors';

export class ProjectController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { workspaceId, name, description, startDate, endDate, members } = req.body;
      const project = await ProjectService.create(workspaceId, {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        members
      });
      res.status(201).json({ success: true, data: project });
    } catch (error) {
      next(new ApiError((error as Error).message, 400));
    }
  }

  static async getProject(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await ProjectService.getById(req.params.projectId);
      if (!project) return next(new ApiError('Project not found', 404));
      res.json({ success: true, data: project });
    } catch (error) {
      next(new ApiError((error as Error).message, 500));
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { workspaceId } = req.query;
      if (!workspaceId || typeof workspaceId !== 'string') {
        return next(new ApiError('workspaceId query required', 400));
      }
      const projects = await ProjectService.listByWorkspace(workspaceId);
      res.json({ success: true, data: projects });
    } catch (error) {
      next(new ApiError((error as Error).message, 500));
    }
  }
}
