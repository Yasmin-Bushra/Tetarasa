import 'dotenv/config';
import { randomBytes } from 'node:crypto';

const development = process.env.NODE_ENV !== 'production';
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret && !development) throw new Error('JWT_SECRET must be set in production.');
if (!jwtSecret) console.warn('JWT_SECRET is unset; using a temporary development-only secret. Set it in backend/.env before deployment.');

export const config = {
  port: Number(process.env.PORT ?? 4000),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/tetarasa',
  jwtSecret: jwtSecret ?? randomBytes(32).toString('hex'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  development,
};
