import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    projectId: z.string().length(24),
    title: z.string().min(2),
    description: z.string().optional(),
    assignedTo: z.string().length(24),
    milestoneId: z.string().length(24).optional(),
    dueDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid due date'),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH'])
  })
});

export const updateTaskStatusSchema = z.object({
  body: z.object({ status: z.enum(['PENDING', 'IN_PROGRESS', 'SUBMITTED', 'APPROVED', 'REJECTED']) }),
  params: z.object({ taskId: z.string().length(24) })
});
