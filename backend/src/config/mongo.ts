import mongoose from 'mongoose';
import { env } from './env';

export async function connectDatabase() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(env.mongoUri);
  console.log('✅ MongoDB connected');
}
