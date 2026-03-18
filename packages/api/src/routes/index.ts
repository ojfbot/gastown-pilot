import type { Express } from 'express';
import healthRouter from './health.js';
import toolsRouter from './tools.js';
import gastownRouter from './gastown.js';
import wastelandRouter from './wasteland.js';

export function registerRoutes(app: Express): void {
  app.use(healthRouter);
  app.use(toolsRouter);
  app.use(gastownRouter);
  app.use(wastelandRouter);
}
