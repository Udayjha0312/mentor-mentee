import mongoose, { Schema, Document, Model } from 'mongoose';
import { Priority, TaskStatus } from '../../types';

export interface ITask extends Document {
  project: mongoose.Types.ObjectId;
  milestone?: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  assignedTo: mongoose.Types.ObjectId;
  mentor: mongoose.Types.ObjectId;
  dueDate: Date;
  priority: Priority;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    milestone: { type: Schema.Types.ObjectId, ref: 'Milestone' },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mentor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' },
    status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'SUBMITTED', 'APPROVED', 'REJECTED'], default: 'PENDING' }
  },
  { timestamps: true }
);

const TaskModel = mongoose.models.Task as Model<ITask> || mongoose.model<ITask>('Task', taskSchema);
export default TaskModel;
