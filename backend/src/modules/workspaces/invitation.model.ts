import mongoose, { Schema, Document, Model } from 'mongoose';
import { InvitationStatus, Role } from '../../types';

export interface IInvitation extends Document {
  workspace: mongoose.Types.ObjectId;
  email: string;
  invitedBy: mongoose.Types.ObjectId;
  role: Role;
  status: InvitationStatus;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

const invitationSchema = new Schema<IInvitation>(
  {
    workspace: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    invitedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['ADMIN', 'MENTOR', 'MENTEE'], required: true },
    status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' },
    token: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

const InvitationModel = mongoose.models.Invitation as Model<IInvitation> || mongoose.model<IInvitation>('Invitation', invitationSchema);
export default InvitationModel;
