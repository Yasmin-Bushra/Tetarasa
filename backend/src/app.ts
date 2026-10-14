import express, { type ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { pool } from './db.js';
import { config } from './config.js';
import { authRouter } from './routes/auth.js';
import { caregiversRouter } from './routes/caregivers.js';
import { mothersRouter } from './routes/mothers.js';
import { requestsRouter } from './routes/requests.js';
import { appointmentsRouter } from './routes/appointments.js';

export const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: config.clientOrigin }));
app.use(express.json({ limit: '1mb' }));
app.get('/api/health', async (_req, res) => {
  let database: 'connected' | 'disconnected' = 'disconnected';
  try { await pool.query('SELECT 1'); database = 'connected'; } catch { /* API can start before PostgreSQL is available. */ }
  res.status(200).json({ status: 'ok', database });
});
app.use('/api/auth', authRouter);
app.use('/api/caregivers', caregiversRouter);
app.use('/api/mothers', mothersRouter);
app.use('/api/requests', requestsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use((_req, res) => res.status(404).json({ error: 'Route not found.' }));
const errors: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: config.development ? (error instanceof Error ? error.message : 'Unexpected server error.') : 'Unexpected server error.' });
};
app.use(errors);
