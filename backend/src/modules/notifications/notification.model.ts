import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  message: string;
  read: boolean;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

const NotificationModel = mongoose.models.Notification as Model<INotification> || mongoose.model<INotification>('Notification', notificationSchema);
export default NotificationModel;
