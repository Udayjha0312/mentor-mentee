import mongoose, { Schema, Document, Model } from 'mongoose';
import { TaskStatus } from '../../types';

export interface ITaskReview extends Document {
  submission: mongoose.Types.ObjectId;
  reviewer: mongoose.Types.ObjectId;
  feedback: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

const taskReviewSchema = new Schema<ITaskReview>(
  {
    submission: { type: Schema.Types.ObjectId, ref: 'TaskSubmission', required: true },
    reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    feedback: { type: String, default: '' },
    status: { type: String, enum: ['APPROVED', 'REJECTED'], required: true }
  },
  { timestamps: true }
);

const TaskReviewModel = mongoose.models.TaskReview as Model<ITaskReview> || mongoose.model<ITaskReview>('TaskReview', taskReviewSchema);
export default TaskReviewModel;
