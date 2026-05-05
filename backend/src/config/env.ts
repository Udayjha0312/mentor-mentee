import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const required = ['MONGO_URI', 'JWT_SECRET', 'PORT', 'CORS_ORIGIN'];
required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
});

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  corsOrigin: process.env.CORS_ORIGIN as string,
};
