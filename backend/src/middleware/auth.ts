import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

type Claims = { sub: string; role: 'mother' | 'caregiver'; email: string };
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Authentication required.' });
  try {
    const claims = jwt.verify(token, config.jwtSecret) as Claims;
    req.auth = { userId: claims.sub, role: claims.role, email: claims.email };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

export function requireRole(...roles: Array<'mother' | 'caregiver'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth || !roles.includes(req.auth.role)) return res.status(403).json({ error: 'You do not have access to this resource.' });
    next();
  };
}
