import { Router } from 'express';
import { pool } from '../db.js';

export const caregiversRouter = Router();
caregiversRouter.get('/', async (req, res, next) => {
  const q = String(req.query.q ?? '').trim();
  const location = String(req.query.location ?? '').trim();
  const service = String(req.query.service ?? '').trim();
  try {
    const result = await pool.query(
      `SELECT u.id, u.full_name AS name, cp.bio, cp.location, cp.years_experience, cp.services, cp.languages, cp.hourly_rate, cp.photo_url
       FROM caregiver_profiles cp JOIN users u ON u.id = cp.user_id
       WHERE ($1 = '' OR u.full_name ILIKE '%' || $1 || '%' OR cp.bio ILIKE '%' || $1 || '%' OR EXISTS (SELECT 1 FROM unnest(cp.services) s WHERE s ILIKE '%' || $1 || '%'))
       AND ($2 = '' OR cp.location ILIKE '%' || $2 || '%')
       AND ($3 = '' OR EXISTS (SELECT 1 FROM unnest(cp.services) s WHERE s ILIKE '%' || $3 || '%'))
       ORDER BY u.full_name LIMIT 100`, [q, location, service]);
    res.json({ caregivers: result.rows });
  } catch (error) { next(error); }
});

caregiversRouter.get('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.full_name AS name, cp.bio, cp.location, cp.years_experience, cp.services, cp.languages, cp.hourly_rate, cp.photo_url
       FROM caregiver_profiles cp JOIN users u ON u.id = cp.user_id WHERE u.id = $1 AND u.role = 'caregiver'`, [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ error: 'Caregiver not found.' });
    res.json({ caregiver: result.rows[0] });
  } catch (error) { next(error); }
});
