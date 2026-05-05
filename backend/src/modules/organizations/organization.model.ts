import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  description?: string;
  owner: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const organizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

const OrganizationModel = mongoose.models.Organization as Model<IOrganization> || mongoose.model<IOrganization>('Organization', organizationSchema);
export default OrganizationModel;
