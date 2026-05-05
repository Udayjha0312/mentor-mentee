import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    workspaceId: z.string().length(24),
    name: z.string().min(2),
    description: z.string().optional(),
    startDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid start date'),
    endDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid end date'),
    members: z.array(z.string().length(24)).optional()
  })
});
