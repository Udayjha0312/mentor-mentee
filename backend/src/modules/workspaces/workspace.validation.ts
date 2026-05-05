import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().optional()
  })
});

export const inviteWorkspaceSchema = z.object({
  body: z.object({
    email: z.string().email(),
    role: z.enum(['ADMIN', 'MENTOR', 'MENTEE'])
  }),
  params: z.object({ workspaceId: z.string().length(24) })
});

export const respondInvitationSchema = z.object({
  body: z.object({ status: z.enum(['ACCEPTED', 'REJECTED']) }),
  params: z.object({ token: z.string() })
});
