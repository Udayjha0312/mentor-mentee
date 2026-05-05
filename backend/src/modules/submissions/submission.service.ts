import TaskModel from '../tasks/task.model';
import TaskSubmissionModel from './taskSubmission.model';
import TaskReviewModel from './taskReview.model';

export class SubmissionService {
  static async submit(payload: { taskId: string; userId: string; comment?: string; githubUrl?: string; fileUrl?: string }) {
    const task = await TaskModel.findById(payload.taskId);
    if (!task) throw new Error('Task not found');
    if (task.assignedTo.toString() !== payload.userId.toString()) {
      throw new Error('Only the assigned mentee can submit this task');
    }
    const submission = await TaskSubmissionModel.create({
      task: task._id,
      submittedBy: payload.userId,
      comment: payload.comment || '',
      githubUrl: payload.githubUrl || '',
      fileUrl: payload.fileUrl || ''
    });
    await TaskModel.findByIdAndUpdate(task._id, { status: 'SUBMITTED' });
    return submission;
  }

  static async review(payload: { submissionId: string; reviewerId: string; feedback: string; status: 'APPROVED' | 'REJECTED' }) {
    const submission = await TaskSubmissionModel.findById(payload.submissionId);
    if (!submission) throw new Error('Submission not found');
    const task = await TaskModel.findById(submission.task);
    if (!task) throw new Error('Task not found');
    if (task.mentor.toString() !== payload.reviewerId.toString()) {
      throw new Error('Only the assigned mentor can review this task');
    }
    const review = await TaskReviewModel.create({
      submission: submission._id,
      reviewer: payload.reviewerId,
      feedback: payload.feedback,
      status: payload.status
    });
    await TaskModel.findByIdAndUpdate(task._id, { status: payload.status });
    return review;
  }
}
