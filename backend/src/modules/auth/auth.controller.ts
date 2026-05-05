import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { AuthService } from './auth.service';
import { ApiError } from '../../utils/errors';

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, organizationName } = req.body;
      const { user, token } = await AuthService.signup(name, email, password, organizationName);
      res.status(201).json({ success: true, data: { user, token } });
    } catch (error) {
      next(new ApiError((error as Error).message, 400));
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      res.status(200).json({ success: true, data: { user, token } });
    } catch (error) {
      next(new ApiError((error as Error).message, 401));
    }
  }

  static async demoLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await AuthService.demoLogin();
      res.status(200).json({ success: true, data: { user, token } });
    } catch (error) {
      next(new ApiError((error as Error).message, 500));
    }
  }

  static getProfile(req: AuthRequest, res: Response) {
    res.json({ success: true, data: req.user });
  }
}
