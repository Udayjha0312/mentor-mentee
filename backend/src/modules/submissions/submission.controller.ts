import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { SubmissionService } from './submission.service';
import { ApiError } from '../../utils/errors';

export class SubmissionController {
  static async submit(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { taskId, comment, githubUrl, fileUrl } = req.body;
      const submission = await SubmissionService.submit({
        taskId,
        userId: req.user._id,
        comment,
        githubUrl,
        fileUrl
      });
      res.status(201).json({ success: true, data: submission });
    } catch (error) {
      next(new ApiError((error as Error).message, 400));
    }
  }

  static async review(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { submissionId, feedback, status } = req.body;
      const review = await SubmissionService.review({
        submissionId,
        reviewerId: req.user._id,
        feedback,
        status
      });
      res.status(201).json({ success: true, data: review });
    } catch (error) {
      next(new ApiError((error as Error).message, 400));
    }
  }
}
