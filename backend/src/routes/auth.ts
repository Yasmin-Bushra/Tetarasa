import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { pool } from '../db.js';
import { config } from '../config.js';
import { requireAuth } from '../middleware/auth.js';

export const authRouter = Router();
const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(30),
  password: z.string().min(8).max(128),
  role: z.enum(['mother', 'caregiver']),
});
const loginSchema = z.object({ email: z.string().trim().email(), password: z.string().min(1) });

function tokenFor(user: { id: string; role: 'mother' | 'caregiver'; email: string }) {
  return jwt.sign({ role: user.role, email: user.email }, config.jwtSecret, { subject: user.id, expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'] });
}

authRouter.post('/register', async (req, res, next) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid registration details.', details: parsed.error.flatten() });
  try {
    const { fullName, email, phone, password, role } = parsed.data;
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      'INSERT INTO users (full_name, email, phone, password_hash, role) VALUES ($1, lower($2), $3, $4, $5) RETURNING id, full_name, email, phone, role, created_at',
      [fullName, email, phone, passwordHash, role],
    );
    const user = result.rows[0];
    await pool.query(role === 'mother' ? 'INSERT INTO mother_profiles (user_id) VALUES ($1)' : 'INSERT INTO caregiver_profiles (user_id) VALUES ($1)', [user.id]);
    res.status(201).json({ user, token: tokenFor(user) });
  } catch (error) {
    if ((error as { code?: string }).code === '23505') return res.status(409).json({ error: 'An account with this email already exists.' });
    next(error);
  }
});

authRouter.post('/login', async (req, res, next) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Enter a valid email and password.' });
  try {
    const result = await pool.query('SELECT id, full_name, email, phone, role, password_hash, created_at FROM users WHERE email = lower($1)', [parsed.data.email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(parsed.data.password, user.password_hash))) return res.status(401).json({ error: 'Email or password is incorrect.' });
    const { password_hash: _passwordHash, ...safeUser } = user;
    res.json({ user: safeUser, token: tokenFor(user) });
  } catch (error) { next(error); }
});

authRouter.get('/me', requireAuth, async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, full_name, email, phone, role, created_at FROM users WHERE id = $1', [req.auth!.userId]);
    if (!result.rowCount) return res.status(404).json({ error: 'Account not found.' });
    res.json({ user: result.rows[0] });
  } catch (error) { next(error); }
});
