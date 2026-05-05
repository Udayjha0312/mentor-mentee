import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IActivityLog extends Document {
  user?: mongoose.Types.ObjectId;
  organization?: mongoose.Types.ObjectId;
  workspace?: mongoose.Types.ObjectId;
  action: string;
  resource: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
    workspace: { type: Schema.Types.ObjectId, ref: 'Workspace' },
    action: { type: String, required: true },
    resource: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

const ActivityLogModel = mongoose.models.ActivityLog as Model<IActivityLog> || mongoose.model<IActivityLog>('ActivityLog', activityLogSchema);
export default ActivityLogModel;
