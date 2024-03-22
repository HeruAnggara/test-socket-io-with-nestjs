// notification.interface.ts

import { Document } from 'mongoose';

export interface Notification extends Document {
  message: string;
  createdAt: Date;
}
