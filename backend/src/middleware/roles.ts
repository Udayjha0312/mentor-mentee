import { NextFunction, Response } from 'express';
import { AuthRequest } from './auth';
import { ApiError } from '../utils/errors';

export const requireRole = (allowed: string[] = []) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return next(new ApiError('Unauthorized', 401));
    }
    if (!allowed.includes(user.role)) {
      return next(new ApiError('Forbidden', 403));
    }
    next();
  };
};
