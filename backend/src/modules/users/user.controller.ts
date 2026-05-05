import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { UserService } from './user.service';
import { ApiError } from '../../utils/errors';

export class UserController {
  static async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await UserService.findById(req.user._id);
      res.json({ success: true, data: user });
    } catch (error) {
      next(new ApiError((error as Error).message, 500));
    }
  }

  static async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await UserService.updateProfile(req.user._id, req.body);
      res.json({ success: true, data: user });
    } catch (error) {
      next(new ApiError((error as Error).message, 400));
    }
  }
}
