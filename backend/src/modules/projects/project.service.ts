import ProjectModel from './project.model';
import WorkspaceModel from '../workspaces/workspace.model';

export class ProjectService {
  static async create(workspaceId: string, payload: { name: string; description?: string; startDate: Date; endDate: Date; members?: string[] }) {
    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) throw new Error('Workspace not found');
    if (payload.startDate > payload.endDate) throw new Error('Project start date must be before end date');
    return ProjectModel.create({
      workspace: workspace._id,
      name: payload.name,
      description: payload.description,
      startDate: payload.startDate,
      endDate: payload.endDate,
      members: payload.members || []
    });
  }

  static async getById(projectId: string) {
    return ProjectModel.findById(projectId).populate('members', 'name email role');
  }

  static async listByWorkspace(workspaceId: string) {
    return ProjectModel.find({ workspace: workspaceId }).populate('members', 'name email role');
  }
}
