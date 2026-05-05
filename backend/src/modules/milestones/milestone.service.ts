import MilestoneModel from './milestone.model';
import ProjectModel from '../projects/project.model';

export class MilestoneService {
  static async create(projectId: string, title: string, description: string, dueDate: Date) {
    const project = await ProjectModel.findById(projectId);
    if (!project) throw new Error('Project not found');
    if (dueDate < project.startDate || dueDate > project.endDate) {
      throw new Error('Milestone deadline must fall within the project timeline');
    }
    return MilestoneModel.create({ project: project._id, title, description, dueDate });
  }
}
