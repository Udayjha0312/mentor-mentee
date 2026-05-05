import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { TaskService } from './task.service';
import { ApiError } from '../../utils/errors';

export class TaskController {
  static async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { projectId, title, description, assignedTo, milestoneId, dueDate, priority } = req.body;
      const task = await TaskService.create({
        projectId,
        title,
        description,
        assignedTo,
        milestoneId,
        mentorId: req.user._id,
        dueDate: new Date(dueDate),
        priority
      });
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      next(new ApiError((error as Error).message, 400));
    }
  }

  static async updateStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
      const task = await TaskService.updateStatus(taskId, status);
      if (!task) return next(new ApiError('Task not found', 404));
      res.json({ success: true, data: task });
    } catch (error) {
      next(new ApiError((error as Error).message, 400));
    }
  }

  static async getTask(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const task = await TaskService.getById(req.params.taskId);
      if (!task) return next(new ApiError('Task not found', 404));
      res.json({ success: true, data: task });
    } catch (error) {
      next(new ApiError((error as Error).message, 500));
    }
  }
}
