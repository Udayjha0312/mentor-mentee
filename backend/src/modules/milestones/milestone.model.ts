import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMilestone extends Document {
  project: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const milestoneSchema = new Schema<IMilestone>(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const MilestoneModel = mongoose.models.Milestone as Model<IMilestone> || mongoose.model<IMilestone>('Milestone', milestoneSchema);
export default MilestoneModel;
