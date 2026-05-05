import UserModel from '../users/user.model';
import ProjectModel from '../projects/project.model';
import TaskModel from '../tasks/task.model';
import WorkspaceModel from '../workspaces/workspace.model';

export class DashboardService {
  static async adminStats(organizationId: string) {
    const users = await UserModel.countDocuments({ organization: organizationId });
    const workspaceIds = await WorkspaceModel.find({ organization: organizationId }).distinct('_id');
    const projects = await ProjectModel.countDocuments({ workspace: { $in: workspaceIds } });
    const pendingTasks = await TaskModel.countDocuments({ project: { $in: await ProjectModel.find({ workspace: { $in: workspaceIds } }).distinct('_id') }, status: 'PENDING' });
    const completedTasks = await TaskModel.countDocuments({ project: { $in: await ProjectModel.find({ workspace: { $in: workspaceIds } }).distinct('_id') }, status: 'APPROVED' });
    return { users, projects, pendingTasks, completedTasks };
  }

  static async mentorStats(userId: string) {
    const pendingReviews = await TaskModel.countDocuments({ mentor: userId, status: 'SUBMITTED' });
    const assignedProjects = await ProjectModel.countDocuments({ members: userId });
    return { pendingReviews, assignedProjects };
  }

  static async menteeStats(userId: string) {
    const myTasks = await TaskModel.find({ assignedTo: userId });
    const upcomingDeadlines = await TaskModel.find({ assignedTo: userId, dueDate: { $gte: new Date() } }).limit(5);
    const submissionHistory = await TaskModel.find({ assignedTo: userId, status: { $in: ['SUBMITTED', 'APPROVED', 'REJECTED'] } }).limit(10);
    return { myTasks: myTasks.length, upcomingDeadlines, submissionHistory };
  }
}
