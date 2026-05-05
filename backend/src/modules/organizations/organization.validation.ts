import { z } from 'zod';

export const createOrganizationSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().optional()
  })
});
