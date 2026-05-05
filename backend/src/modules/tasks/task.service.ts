import TaskModel from './task.model';
import ProjectModel from '../projects/project.model';
import UserModel from '../users/user.model';

export class TaskService {
  static async create(payload: {
    projectId: string;
    title: string;
    description?: string;
    assignedTo: string;
    mentorId: string;
    milestoneId?: string;
    dueDate: Date;
    priority: string;
  }) {
    const project = await ProjectModel.findById(payload.projectId);
    if (!project) throw new Error('Project not found');
    const assignee = await UserModel.findById(payload.assignedTo);
    if (!assignee) throw new Error('Assigned mentee not found');
    if (assignee.role !== 'MENTEE') throw new Error('Task must be assigned to a mentee');
    if (payload.dueDate < project.startDate || payload.dueDate > project.endDate) {
      throw new Error('Task deadline must be inside project timeline');
    }
    return TaskModel.create({
      project: project._id,
      milestone: payload.milestoneId,
      title: payload.title,
      description: payload.description,
      assignedTo: assignee._id,
      mentor: payload.mentorId,
      dueDate: payload.dueDate,
      priority: payload.priority,
      status: 'PENDING'
    });
  }

  static async updateStatus(taskId: string, status: string) {
    return TaskModel.findByIdAndUpdate(taskId, { status }, { new: true });
  }

  static async getById(taskId: string) {
    return TaskModel.findById(taskId)
      .populate('assignedTo', 'name email role')
      .populate('mentor', 'name email role');
  }
}
