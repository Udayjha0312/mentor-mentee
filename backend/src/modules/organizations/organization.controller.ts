import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { OrganizationService } from './organization.service';
import { ApiError } from '../../utils/errors';

export class OrganizationController {
  static async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const organization = await OrganizationService.getByUser(req.user._id);
      if (!organization) {
        return next(new ApiError('Organization not found', 404));
      }
      res.json({ success: true, data: organization });
    } catch (error) {
      next(new ApiError((error as Error).message, 500));
    }
  }

  static async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const organization = await OrganizationService.create(req.user._id, name, description);
      res.status(201).json({ success: true, data: organization });
    } catch (error) {
      next(new ApiError((error as Error).message, 400));
    }
  }
}
