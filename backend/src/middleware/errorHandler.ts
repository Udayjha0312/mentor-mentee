import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errors';

export const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || 'Server Error';
  res.status(statusCode).json({
    success: false,
    message,
    details: err instanceof ApiError ? err.details : undefined
  });
};
