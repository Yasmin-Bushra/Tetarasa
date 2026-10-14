import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const requestsRouter = Router();
requestsRouter.use(requireAuth);
requestsRouter.get('/', async (req, res, next) => {
  try {
    const isMother = req.auth!.role === 'mother';
    const result = await pool.query(`SELECT cr.*, m.full_name AS mother_name, c.full_name AS caregiver_name
      FROM care_requests cr JOIN users m ON m.id=cr.mother_id JOIN users c ON c.id=cr.caregiver_id
      WHERE ($1='mother' AND cr.mother_id=$2) OR ($1='caregiver' AND cr.caregiver_id=$2)
      ORDER BY cr.created_at DESC LIMIT 100`, [isMother ? 'mother' : 'caregiver', req.auth!.userId]);
    res.json({ requests: result.rows });
  } catch (error) { next(error); }
});

const createSchema = z.object({ caregiverId: z.string().uuid(), message: z.string().trim().max(3000).optional(), requestedDate: z.string().date().optional() });
requestsRouter.post('/', requireRole('mother'), async (req, res, next) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid care request.', details: parsed.error.flatten() });
  try {
    const result = await pool.query(`INSERT INTO care_requests (mother_id, caregiver_id, message, requested_date)
      SELECT $1, $2, $3, $4 WHERE EXISTS (SELECT 1 FROM users WHERE id=$2 AND role='caregiver') RETURNING *`,
      [req.auth!.userId, parsed.data.caregiverId, parsed.data.message ?? null, parsed.data.requestedDate ?? null]);
    if (!result.rowCount) return res.status(404).json({ error: 'Caregiver not found.' });
    res.status(201).json({ request: result.rows[0] });
  } catch (error) { next(error); }
});

requestsRouter.patch('/:id/respond', requireRole('caregiver'), async (req, res, next) => {
  const parsed = z.object({ status: z.enum(['accepted', 'declined']) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Status must be accepted or declined.' });
  try {
    const result = await pool.query(`UPDATE care_requests SET status=$1, updated_at=now() WHERE id=$2 AND caregiver_id=$3 AND status='pending' RETURNING *`, [parsed.data.status, req.params.id, req.auth!.userId]);
    if (!result.rowCount) return res.status(404).json({ error: 'Pending care request not found.' });
    res.json({ request: result.rows[0] });
  } catch (error) { next(error); }
});

requestsRouter.patch('/:id/cancel', requireRole('mother'), async (req, res, next) => {
  try {
    const result = await pool.query(`UPDATE care_requests SET status='cancelled', updated_at=now() WHERE id=$1 AND mother_id=$2 AND status='pending' RETURNING *`, [req.params.id, req.auth!.userId]);
    if (!result.rowCount) return res.status(404).json({ error: 'Pending care request not found.' });
    res.json({ request: result.rows[0] });
  } catch (error) { next(error); }
});
