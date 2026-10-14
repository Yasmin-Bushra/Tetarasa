import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const appointmentsRouter = Router();
appointmentsRouter.use(requireAuth);
appointmentsRouter.get('/', async (req, res, next) => {
  try {
    const side = req.auth!.role === 'mother' ? 'mother_id' : 'caregiver_id';
    const result = await pool.query(`SELECT a.*, m.full_name AS mother_name, c.full_name AS caregiver_name FROM appointments a
      JOIN users m ON m.id=a.mother_id JOIN users c ON c.id=a.caregiver_id WHERE a.${side}=$1 ORDER BY a.starts_at LIMIT 100`, [req.auth!.userId]);
    res.json({ appointments: result.rows });
  } catch (error) { next(error); }
});
appointmentsRouter.post('/', async (req, res, next) => {
  const parsed = z.object({ requestId: z.string().uuid(), startsAt: z.string().datetime(), endsAt: z.string().datetime().optional(), notes: z.string().trim().max(2000).optional() }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid appointment details.', details: parsed.error.flatten() });
  try {
    const result = await pool.query(`INSERT INTO appointments (request_id, mother_id, caregiver_id, starts_at, ends_at, notes)
      SELECT cr.id, cr.mother_id, cr.caregiver_id, $2, $3, $4 FROM care_requests cr
      WHERE cr.id=$1 AND cr.status='accepted' AND (( $5='mother' AND cr.mother_id=$6) OR ($5='caregiver' AND cr.caregiver_id=$6)) RETURNING *`,
      [parsed.data.requestId, parsed.data.startsAt, parsed.data.endsAt ?? null, parsed.data.notes ?? null, req.auth!.role, req.auth!.userId]);
    if (!result.rowCount) return res.status(404).json({ error: 'Accepted care request not found for this account.' });
    res.status(201).json({ appointment: result.rows[0] });
  } catch (error) { next(error); }
});
