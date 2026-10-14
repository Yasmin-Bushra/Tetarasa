import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const mothersRouter = Router();
mothersRouter.use(requireAuth, requireRole('mother'));
mothersRouter.get('/me/profile', async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT u.id, u.full_name, u.email, u.phone, mp.address, mp.location, mp.due_date, mp.birth_date, mp.preferred_language, mp.care_notes
      FROM users u JOIN mother_profiles mp ON mp.user_id = u.id WHERE u.id = $1`, [req.auth!.userId]);
    if (!result.rowCount) return res.status(404).json({ error: 'Profile not found.' });
    res.json({ profile: result.rows[0] });
  } catch (error) { next(error); }
});

const profileSchema = z.object({
  fullName: z.string().trim().min(2).max(120), phone: z.string().trim().min(7).max(30),
  address: z.string().trim().max(250).nullable().optional(), location: z.string().trim().max(120).nullable().optional(),
  dueDate: z.string().date().nullable().optional(), birthDate: z.string().date().nullable().optional(),
  preferredLanguage: z.string().trim().max(80).nullable().optional(), careNotes: z.string().trim().max(3000).nullable().optional(),
});
mothersRouter.put('/me/profile', async (req, res, next) => {
  const parsed = profileSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid profile details.', details: parsed.error.flatten() });
  try {
    const p = parsed.data; const id = req.auth!.userId;
    await pool.query('UPDATE users SET full_name=$1, phone=$2, updated_at=now() WHERE id=$3', [p.fullName, p.phone, id]);
    const result = await pool.query(`UPDATE mother_profiles SET address=$1, location=$2, due_date=$3, birth_date=$4, preferred_language=$5, care_notes=$6, updated_at=now()
      WHERE user_id=$7 RETURNING *`, [p.address ?? null, p.location ?? null, p.dueDate ?? null, p.birthDate ?? null, p.preferredLanguage ?? null, p.careNotes ?? null, id]);
    res.json({ profile: result.rows[0] });
  } catch (error) { next(error); }
});
