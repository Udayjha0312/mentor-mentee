import mongoose, { Schema, Document, Model } from 'mongoose';
import { Role } from '../../types';

export interface IWorkspaceMember {
  user: mongoose.Types.ObjectId;
  role: Role;
}

export interface IWorkspace extends Document {
  organization: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  members: IWorkspaceMember[];
  createdAt: Date;
  updatedAt: Date;
}

const workspaceMemberSchema = new Schema<IWorkspaceMember>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['ADMIN', 'MENTOR', 'MENTEE'], required: true }
  },
  { _id: false }
);

const workspaceSchema = new Schema<IWorkspace>(
  {
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    members: { type: [workspaceMemberSchema], default: [] }
  },
  { timestamps: true }
);

const WorkspaceModel = mongoose.models.Workspace as Model<IWorkspace> || mongoose.model<IWorkspace>('Workspace', workspaceSchema);
export default WorkspaceModel;
