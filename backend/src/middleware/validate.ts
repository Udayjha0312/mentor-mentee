import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { ApiError } from '../utils/errors';

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query
  });
  if (!result.success) {
    return next(new ApiError('Validation error', 400, result.error.format()));
  }
  Object.assign(req, result.data);
  next();
};
