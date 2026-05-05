import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITaskSubmission extends Document {
  task: mongoose.Types.ObjectId;
  submittedBy: mongoose.Types.ObjectId;
  comment: string;
  githubUrl?: string;
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSubmissionSchema = new Schema<ITaskSubmission>(
  {
    task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    fileUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

const TaskSubmissionModel = mongoose.models.TaskSubmission as Model<ITaskSubmission> || mongoose.model<ITaskSubmission>('TaskSubmission', taskSubmissionSchema);
export default TaskSubmissionModel;
