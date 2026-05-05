import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { DashboardService } from './dashboard.service';
import { ApiError } from '../../utils/errors';

export class DashboardController {
  static async admin(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const organizationId = req.user.organization;
      const stats = await DashboardService.adminStats(organizationId);
      res.json({ success: true, data: stats });
    } catch (error) {
      next(new ApiError((error as Error).message, 500));
    }
  }

  static async mentor(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stats = await DashboardService.mentorStats(req.user._id);
      res.json({ success: true, data: stats });
    } catch (error) {
      next(new ApiError((error as Error).message, 500));
    }
  }

  static async mentee(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stats = await DashboardService.menteeStats(req.user._id);
      res.json({ success: true, data: stats });
    } catch (error) {
      next(new ApiError((error as Error).message, 500));
    }
  }
}
