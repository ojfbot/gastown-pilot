import { Router } from 'express';
import { WastelandDoltClient } from '../connectors/wasteland-dolt.js';
import { GtCliAdapter } from '../connectors/gt-cli.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();
const wasteland = new WastelandDoltClient();
const gt = new GtCliAdapter();

router.use(authenticateJWT);

/** GET /api/wasteland/wanted — wanted board */
router.get('/api/wasteland/wanted', async (req, res) => {
  const status = req.query.status as string | undefined;
  const items = await wasteland.getWantedItems(status);
  res.json({ items });
});

/** GET /api/wasteland/sheet/:handle — character sheet */
router.get('/api/wasteland/sheet/:handle', async (req, res) => {
  const sheet = await wasteland.getCharacterSheet(req.params.handle);
  if (!sheet) { res.status(404).json({ error: 'Character sheet not found' }); return; }
  res.json(sheet);
});

/** GET /api/wasteland/stamps/:handle — stamp history */
router.get('/api/wasteland/stamps/:handle', async (req, res) => {
  const stamps = await wasteland.getStamps(req.params.handle);
  res.json({ stamps });
});

/** GET /api/wasteland/leaderboard — top rigs by score */
router.get('/api/wasteland/leaderboard', async (req, res) => {
  const limit = Number(req.query.limit ?? 50);
  const leaderboard = await wasteland.getLeaderboard(limit);
  res.json({ leaderboard });
});

/** POST /api/wasteland/claim — claim a wanted item */
router.post('/api/wasteland/claim', async (req, res) => {
  const { id } = req.body as { id: string };
  if (!id) { res.status(400).json({ error: 'Missing id' }); return; }
  const result = await gt.wastelandClaim(id);
  res.json(result);
});

/** POST /api/wasteland/post — post a new wanted item */
router.post('/api/wasteland/post', async (req, res) => {
  const { title, description, effort, tags } = req.body as {
    title: string; description: string; effort: string; tags: string[];
  };
  if (!title) { res.status(400).json({ error: 'Missing title' }); return; }
  const result = await gt.wastelandPost(title, description ?? '', effort ?? 'small', tags ?? []);
  res.json(result);
});

/** POST /api/wasteland/done — submit completion */
router.post('/api/wasteland/done', async (req, res) => {
  const { id, evidence, commit } = req.body as { id: string; evidence: string; commit?: string };
  if (!id || !evidence) { res.status(400).json({ error: 'Missing id or evidence' }); return; }
  const result = await gt.wastelandDone(id, evidence, commit);
  res.json(result);
});

/** POST /api/wasteland/sync — trigger gt wl sync */
router.post('/api/wasteland/sync', async (_req, res) => {
  const result = await gt.wastelandSync();
  res.json(result);
});

export default router;
