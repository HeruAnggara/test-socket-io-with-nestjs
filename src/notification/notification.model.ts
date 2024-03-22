// notification.model.ts

import { Schema, Document, model } from 'mongoose';

export interface Notification extends Document {
  message: string;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema({
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const NotificationModel = model<Notification>('Notification', NotificationSchema);
