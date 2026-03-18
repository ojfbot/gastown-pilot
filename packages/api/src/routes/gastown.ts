import { Router } from 'express';
import { DoltSqlClient } from '../connectors/dolt-sql.js';
import { GtCliAdapter } from '../connectors/gt-cli.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();
const dolt = new DoltSqlClient();
const gt = new GtCliAdapter();

// All routes require auth
router.use(authenticateJWT);

/** GET /api/agents — agent tree */
router.get('/api/agents', async (_req, res) => {
  const agents = await dolt.getAgents();
  res.json({ agents });
});

/** GET /api/convoys — convoy list with progress */
router.get('/api/convoys', async (_req, res) => {
  const convoys = await dolt.getConvoys();
  res.json({ convoys });
});

/** GET /api/rigs — rig health overview */
router.get('/api/rigs', async (_req, res) => {
  const rigs = await dolt.getRigs();
  res.json({ rigs });
});

/** GET /api/rigs/:name/health — run gt doctor for a specific rig */
router.get('/api/rigs/:name/health', async (req, res) => {
  const result = await gt.doctor(req.params.name);
  res.json(result);
});

/** GET /api/beads — query beads with filter params */
router.get('/api/beads', async (_req, res) => {
  // SCAFFOLD: stub — returns empty array
  // TODO: wire to DoltSqlClient.queryBeads(filter)
  res.json({ beads: [] });
});

/** GET /api/formulas — formula library */
router.get('/api/formulas', async (_req, res) => {
  const formulas = await dolt.getFormulas();
  res.json({ formulas });
});

/** POST /api/commands — gt CLI proxy for mutations */
router.post('/api/commands', async (req, res) => {
  const { cmd } = req.body as { cmd: string };
  if (!cmd || typeof cmd !== 'string') {
    res.status(400).json({ error: 'Missing cmd field' });
    return;
  }
  const result = await gt.execute(cmd);
  res.json(result);
});

export default router;
