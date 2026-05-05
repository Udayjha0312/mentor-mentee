import mongoose, { Schema, Document, Model } from 'mongoose';
import { ProjectStatus } from '../../types';

export interface IProject extends Document {
  workspace: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  status: ProjectStatus;
  startDate: Date;
  endDate: Date;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    workspace: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['PLANNING', 'ACTIVE', 'COMPLETED'], default: 'PLANNING' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

const ProjectModel = mongoose.models.Project as Model<IProject> || mongoose.model<IProject>('Project', projectSchema);
export default ProjectModel;
