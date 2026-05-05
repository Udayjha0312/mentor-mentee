import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../modules/users/user.model';
import { env } from '../config/env';
import { ApiError } from '../utils/errors';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new ApiError('Not authorized', 401));
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, env.jwtSecret) as { userId: string };
    const user = await UserModel.findById(payload.userId).select('-password');
    if (!user) {
      return next(new ApiError('User not found', 401));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError('Invalid token', 401));
  }
};
