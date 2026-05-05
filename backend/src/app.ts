import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { apiLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';
import organizationRoutes from './modules/organizations/organization.routes';
import workspaceRoutes from './modules/workspaces/workspace.routes';
import projectRoutes from './modules/projects/project.routes';
import milestoneRoutes from './modules/milestones/milestone.routes';
import taskRoutes from './modules/tasks/task.routes';
import submissionRoutes from './modules/submissions/submission.routes';
import dashboardRoutes from './modules/dashboard/dashboard.routes';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(morgan('tiny'));
app.use(apiLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
