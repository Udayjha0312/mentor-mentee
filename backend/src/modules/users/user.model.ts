import mongoose, { Schema, Document, Model } from 'mongoose';
import { Role } from '../../types';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  organization: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['ADMIN', 'MENTOR', 'MENTEE'], required: true, default: 'MENTEE' },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true }
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User as Model<IUser> || mongoose.model<IUser>('User', userSchema);
export default UserModel;
