/**
 * Dev-mode mock data for Gas Town dashboard.
 *
 * Used as fallback when the API (localhost:3018) is unavailable.
 * Mirrors the realistic operational snapshot from Storybook stories.
 * Remove or gate behind a flag when real API is wired.
 */

export const MOCK_AGENTS = {
  agents: [
    { id: 'mayor', name: 'Mayor', rig: 'hq', status: 'active', task: 'Monitoring convoy progress across 5 rigs' },
    { id: 'deacon', name: 'Deacon', rig: 'hq', status: 'active', task: 'Validating stamp submissions for Sprint-7' },
    { id: 'a1', name: 'scaffold-worker', rig: 'ojfbot-frame', status: 'active', task: 'Generating SettingsModal.stories.tsx' },
    { id: 'a2', name: 'test-runner', rig: 'ojfbot-frame', status: 'idle', task: '' },
    { id: 'a3', name: 'lint-patrol', rig: 'ojfbot-frame', status: 'active', task: 'Scanning packages/ui/ for unused imports' },
    { id: 'a8', name: 'ci-hardener', rig: 'ojfbot-frame', status: 'active', task: 'Adding continue-on-error to Docker steps' },
    { id: 'a4', name: 'doc-writer', rig: 'purefoy', status: 'stalled', task: 'Waiting for bbPress scrape to complete', stallDuration: '7m 30s' },
    { id: 'a5', name: 'scraper-main', rig: 'purefoy', status: 'active', task: 'Scraping Roger Deakins Q&A thread #847' },
    { id: 'a6', name: 'deploy-agent', rig: 'blogengine', status: 'error', task: 'Build failed — missing env VITE_API_URL' },
    { id: 'a9', name: 'content-reviewer', rig: 'blogengine', status: 'active', task: 'Tone-checking draft post on AI agents' },
    { id: 'a10', name: 'story-writer', rig: 'blogengine', status: 'idle', task: '' },
    { id: 'a11', name: 'itinerary-agent', rig: 'tripplanner', status: 'active', task: 'Generating Tokyo 5-day budget itinerary' },
    { id: 'a12', name: 'ci-watcher', rig: 'tripplanner', status: 'active', task: 'Monitoring PR #31 type-check run' },
    { id: 'a13', name: 'resume-optimizer', rig: 'cv-builder', status: 'active', task: 'Tailoring resume for TBCoNY application' },
    { id: 'a14', name: 'visual-tester', rig: 'cv-builder', status: 'idle', task: '' },
  ],
}

export const MOCK_CONVOYS = {
  convoys: [
    { id: 'c1', title: 'Sprint-7: Storybook + CI hardening', total: 12, done: 7, active: 3, blocked: 1, status: 'active' },
    { id: 'c2', title: 'Sprint-6: Container/presenter decomposition', total: 8, done: 8, active: 0, blocked: 0, status: 'completed' },
    { id: 'c3', title: 'Hotfix: SSE relay reconnect', total: 3, done: 1, active: 1, blocked: 1, status: 'stalled' },
    { id: 'c4', title: 'Sprint-8: Gas Town mock data + formulas', total: 6, done: 0, active: 2, blocked: 0, status: 'active' },
  ],
}

export const MOCK_EVENTS = {
  events: [
    { type: 'convoy:start', timestamp: '2026-03-20T09:00:00Z', summary: 'Convoy "Sprint-8: Gas Town mock data + formulas" started with 6 beads' },
    { type: 'molecule:started', timestamp: '2026-03-20T09:00:30Z', summary: 'Molecule mol-gastown-mock-data poured from formula "storybook-rollout"' },
    { type: 'agent:spawn', timestamp: '2026-03-20T09:01:00Z', summary: 'Agent ci-hardener spawned on rig ojfbot-frame' },
    { type: 'hook:assigned', timestamp: '2026-03-20T09:02:00Z', summary: 'Hook GT-059 assigned to ci-hardener on ojfbot-frame' },
    { type: 'bead:complete', timestamp: '2026-03-20T09:15:00Z', summary: 'GT-055 "ADR-0029 prop-only boundary" filed by scaffold-worker' },
    { type: 'agent:stall', timestamp: '2026-03-20T09:22:00Z', summary: 'Agent doc-writer stalled on rig purefoy — waiting on scraper-main' },
    { type: 'mail:sent', timestamp: '2026-03-20T09:25:00Z', summary: 'Mayor → doc-writer: "scraper-main ETA 5m — hold position"' },
    { type: 'molecule:step_done', timestamp: '2026-03-20T09:30:00Z', summary: 'Molecule mol-storybook-rollout step "add-ci-gate" completed' },
    { type: 'bead:complete', timestamp: '2026-03-20T09:35:00Z', summary: 'GT-050 "CI gate: Storybook build in cv-builder" done by ci-hardener' },
    { type: 'bead:updated', timestamp: '2026-03-20T09:40:00Z', summary: 'GT-044 "SSE relay reconnect" status → blocked (depends on infra fix)' },
    { type: 'agent:error', timestamp: '2026-03-20T09:45:00Z', summary: 'Agent deploy-agent error on rig blogengine — VITE_API_URL not set' },
    { type: 'convoy:merge', timestamp: '2026-03-19T18:00:00Z', summary: 'Convoy "Sprint-6: Container/presenter decomposition" merged — 8/8 beads, 4 PRs shipped' },
  ],
}

export const MOCK_RIGS = {
  rigs: [
    { name: 'ojfbot-frame', gitUrl: 'https://github.com/ojfbot/shell', agentCount: 4, health: 'healthy' as const, activeConvoys: 2, mergeQueueDepth: 1 },
    { name: 'purefoy', gitUrl: 'https://github.com/ojfbot/purefoy', agentCount: 2, health: 'degraded' as const, activeConvoys: 1, mergeQueueDepth: 3 },
    { name: 'blogengine', gitUrl: 'https://github.com/ojfbot/blogengine', agentCount: 3, health: 'healthy' as const, activeConvoys: 1, mergeQueueDepth: 0 },
    { name: 'tripplanner', gitUrl: 'https://github.com/ojfbot/TripPlanner', agentCount: 2, health: 'healthy' as const, activeConvoys: 1, mergeQueueDepth: 1 },
    { name: 'cv-builder', gitUrl: 'https://github.com/ojfbot/cv-builder', agentCount: 2, health: 'healthy' as const, activeConvoys: 1, mergeQueueDepth: 0 },
  ],
}

export const MOCK_BEADS = {
  beads: [
    { id: 'GT-042', type: 'task', title: 'Add Storybook config to gastown-pilot', status: 'closed', actor: 'scaffold-worker' },
    { id: 'GT-043', type: 'task', title: 'Write stories for all 12 panel components', status: 'closed', actor: 'scaffold-worker' },
    { id: 'GT-044', type: 'bug', title: 'SSE relay drops connection after 60s idle', status: 'live', actor: 'ci-hardener' },
    { id: 'GT-045', type: 'expansion', title: 'Molecule DAG visualization with dagre-d3', status: 'created' },
    { id: 'GT-046', type: 'patrol', title: 'Lint sweep — remove unused imports in panels/', status: 'closed', actor: 'lint-patrol' },
    { id: 'GT-047', type: 'task', title: 'Wire Wasteland sync button to POST /api/commands', status: 'live', actor: 'scaffold-worker' },
    { id: 'GT-048', type: 'adr', title: 'ADR-0029: prop-only boundary for @ojfbot/shell', status: 'closed' },
    { id: 'GT-049', type: 'task', title: 'Register lean-canvas in shell MF remotes', status: 'closed' },
    { id: 'GT-050', type: 'task', title: 'CI gate: Storybook build in cv-builder', status: 'closed', actor: 'ci-hardener' },
    { id: 'GT-055', type: 'task', title: 'Write SettingsModal.stories.tsx for shell', status: 'live', actor: 'scaffold-worker' },
    { id: 'GT-056', type: 'task', title: 'Enhance gastown-pilot mock data — realistic rigs', status: 'live', actor: 'scaffold-worker' },
    { id: 'GT-058', type: 'molecule', title: 'mol-storybook-rollout: cross-repo Storybook adoption', status: 'live' },
  ],
}

export const MOCK_FORMULAS = {
  formulas: [
    {
      name: 'scaffold-app',
      type: 'workflow' as const,
      version: 1,
      description: 'Scaffold a new Frame OS application — monorepo structure, MF config, CI pipeline, shell registration',
      source: 'embedded' as const,
      steps: [
        { id: 'create-dirs', title: 'Create monorepo directory structure', needs: [] as string[], acceptanceCriteria: ['packages/browser-app exists', 'packages/api exists'] },
        { id: 'gen-package-json', title: 'Generate package.json files', needs: ['create-dirs'], acceptanceCriteria: ['Valid JSON', 'pnpm workspace configured'] },
        { id: 'add-mf-config', title: 'Configure Module Federation remote', needs: ['gen-package-json'], acceptanceCriteria: ['federation() plugin', 'exposes ./Dashboard'] },
        { id: 'add-storybook', title: 'Add Storybook ~8.4.0', needs: ['gen-package-json'], acceptanceCriteria: ['build-storybook exits 0'] },
        { id: 'add-ci', title: 'Create CI workflow with Storybook gate', needs: ['add-storybook'], acceptanceCriteria: ['ci.yml exists'] },
        { id: 'register-in-shell', title: 'Wire into shell MF host', needs: ['add-mf-config'], acceptanceCriteria: ['5 registration points wired'] },
        { id: 'install-deps', title: 'Install and verify build', needs: ['gen-package-json', 'add-mf-config'], acceptanceCriteria: ['pnpm build exits 0'] },
      ],
    },
    {
      name: 'deploy-demo',
      type: 'workflow' as const,
      version: 2,
      description: 'Deploy a Frame OS sub-app to Vercel with MF cache headers',
      source: 'embedded' as const,
      steps: [
        { id: 'build', title: 'Build production artifacts', needs: [] as string[], acceptanceCriteria: ['Build exits 0'] },
        { id: 'smoke-test', title: 'Run smoke tests', needs: ['build'], acceptanceCriteria: ['All tests pass'] },
        { id: 'verify-headers', title: 'Verify Vercel cache header rules', needs: ['build'], acceptanceCriteria: ['remoteEntry.js → no-store'] },
        { id: 'deploy', title: 'Deploy to Vercel', needs: ['smoke-test', 'verify-headers'], acceptanceCriteria: ['Preview URL accessible'] },
        { id: 'verify-shell', title: 'Verify shell loads MF remote', needs: ['deploy'], acceptanceCriteria: ['Dashboard loads'] },
      ],
    },
    {
      name: 'wasteland-patrol',
      type: 'patrol' as const,
      version: 1,
      description: 'Scan Wasteland Dolt DB for stale items, validate stamps, report federation health',
      source: 'custom' as const,
      steps: [
        { id: 'query-stale', title: 'Query wanted_items > 30 days', needs: [] as string[], acceptanceCriteria: ['Query completes in 5s'] },
        { id: 'close-expired', title: 'Auto-close expired bounties', needs: ['query-stale'], acceptanceCriteria: ['Status → archived'] },
        { id: 'validate-stamps', title: 'Check stamp FK integrity', needs: [] as string[], acceptanceCriteria: ['No orphaned stamps'] },
        { id: 'check-sync', title: 'Verify town sync freshness', needs: [] as string[], acceptanceCriteria: ['All towns synced < 24h'] },
        { id: 'report', title: 'Generate health report bead', needs: ['close-expired', 'validate-stamps', 'check-sync'], acceptanceCriteria: ['Patrol bead created'] },
      ],
    },
  ],
}

export const MOCK_WASTELAND_WANTED = {
  items: [
    { id: 'w1', title: 'Fix SSE relay reconnect logic', description: 'Handle dropped WebSocket gracefully', effort: 'M', tags: ['bug', 'infra'], status: 'open', poster: 'ojfbot-frame' },
    { id: 'w2', title: 'Add Dolt migration for stamps table', description: 'Schema evolution: confidence + severity columns', effort: 'S', tags: ['infra', 'dolt'], status: 'claimed', poster: 'purefoy', claimant: 'blogengine' },
    { id: 'w3', title: 'Implement trust tier auto-promotion', description: 'Auto-promote after 5 validated stamps', effort: 'L', tags: ['feature', 'governance'], status: 'open', poster: 'ojfbot-frame' },
    { id: 'w4', title: 'Patrol: clean up stale wanted items', description: 'Auto-close after 30 days', effort: 'S', tags: ['patrol'], status: 'completed', poster: 'ojfbot-frame' },
    { id: 'w5', title: 'WastelandBoard read-only viewer for shell', description: 'Embed leaderboard in shell settings', effort: 'M', tags: ['feature', 'shell'], status: 'claimed', poster: 'ojfbot-frame', claimant: 'tripplanner' },
    { id: 'w6', title: 'Cross-rig convoy assignment protocol', description: 'Mayor assigns beads across rig boundaries via mail', effort: 'L', tags: ['feature', 'coordination'], status: 'open', poster: 'ojfbot-frame' },
  ],
}

export const MOCK_CHARACTER_SHEET = {
  rigHandle: 'ojfbot-frame',
  trustTier: 'maintainer',
  totalScore: 847,
  stampCount: 12,
  completedItems: 9,
  skills: { quality: 78, reliability: 92, creativity: 65 },
}

export const MOCK_LEADERBOARD = {
  leaderboard: [
    { handle: 'ojfbot-frame', score: 847, stampCount: 12, completedItems: 9, trustTier: 'maintainer' },
    { handle: 'purefoy', score: 423, stampCount: 7, completedItems: 5, trustTier: 'contributor' },
    { handle: 'blogengine', score: 312, stampCount: 5, completedItems: 4, trustTier: 'contributor' },
    { handle: 'tripplanner', score: 198, stampCount: 3, completedItems: 2, trustTier: 'registered' },
    { handle: 'cv-builder', score: 156, stampCount: 2, completedItems: 2, trustTier: 'registered' },
    { handle: 'daily-logger', score: 89, stampCount: 1, completedItems: 1, trustTier: 'registered' },
    { handle: 'gastown-pilot', score: 45, stampCount: 1, completedItems: 0, trustTier: 'registered' },
    { handle: 'frame-ui-components', score: 22, stampCount: 0, completedItems: 0, trustTier: 'registered' },
  ],
}
