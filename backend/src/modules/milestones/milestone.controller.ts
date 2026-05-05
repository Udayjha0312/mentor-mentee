import { Request, Response, NextFunction } from 'express';
import { MilestoneService } from './milestone.service';
import { ApiError } from '../../utils/errors';

export class MilestoneController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId, title, description, dueDate } = req.body;
      const milestone = await MilestoneService.create(projectId, title, description, new Date(dueDate));
      res.status(201).json({ success: true, data: milestone });
    } catch (error) {
      next(new ApiError((error as Error).message, 400));
    }
  }
}
