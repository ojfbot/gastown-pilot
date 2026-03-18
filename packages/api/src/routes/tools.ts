import { Router } from 'express';

const router = Router();

/**
 * GET /api/tools — ADR-0007 capability manifest.
 * Declares what this sub-app can do so MetaOrchestrator can route to it.
 */
router.get('/api/tools', (_req, res) => {
  res.json({
    app: 'gastown-pilot',
    version: '0.1.0',
    tools: [
      {
        name: 'view_agents',
        description: 'View the agent tree — all agents grouped by rig with status',
        endpoint: 'GET /api/agents',
      },
      {
        name: 'view_convoys',
        description: 'View active convoys with progress tracking',
        endpoint: 'GET /api/convoys',
      },
      {
        name: 'view_beads',
        description: 'Search and filter beads (work items) across all rigs',
        endpoint: 'GET /api/beads',
      },
      {
        name: 'view_rigs',
        description: 'View rig health overview — agent count, convoy count, merge queue',
        endpoint: 'GET /api/rigs',
      },
      {
        name: 'view_formulas',
        description: 'Browse TOML formula library — workflow definitions',
        endpoint: 'GET /api/formulas',
      },
      {
        name: 'run_command',
        description: 'Execute a Gas Town CLI command (sling, nudge, handoff, convoy create)',
        endpoint: 'POST /api/commands',
      },
      {
        name: 'view_wasteland',
        description: 'Browse the Wasteland wanted board, character sheets, and leaderboard',
        endpoint: 'GET /api/wasteland/wanted',
      },
    ],
  });
});

export default router;
