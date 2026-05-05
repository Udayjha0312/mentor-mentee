import { z } from 'zod';

export const submitTaskSchema = z.object({
  body: z.object({
    taskId: z.string().length(24),
    comment: z.string().optional(),
    githubUrl: z.string().url().optional(),
    fileUrl: z.string().url().optional()
  })
});

export const reviewTaskSchema = z.object({
  body: z.object({
    submissionId: z.string().length(24),
    feedback: z.string().min(1),
    status: z.enum(['APPROVED', 'REJECTED'])
  })
});
