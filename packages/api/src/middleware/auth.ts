import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getLogger } from '../utils/logger.js';

const log = getLogger('auth');

export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  if (process.env.MOCK_AUTH === 'true') {
    (req as any).user = { userId: 'dev-user', email: 'dev@example.com' };
    return next();
  }
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) { res.status(401).json({ error: 'Missing token' }); return; }
  try {
    (req as any).user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (err) {
    log.warn('JWT verification failed', err);
    res.status(401).json({ error: 'Invalid token' });
  }
}
