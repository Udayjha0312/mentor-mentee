import { z } from 'zod';

export const createMilestoneSchema = z.object({
  body: z.object({
    projectId: z.string().length(24),
    title: z.string().min(2),
    description: z.string().optional(),
    dueDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid due date')
  })
});
