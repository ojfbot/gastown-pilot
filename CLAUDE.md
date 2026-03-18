# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

> **Before making any architectural decisions, read `domain-knowledge/frame-os-context.md`.** It covers the product vision, demo tracks, repo inventory, roadmap phases, and hard constraints.

## Commands

```bash
pnpm install                          # install all workspace dependencies
pnpm build                            # compile all packages
pnpm test                             # run vitest
pnpm test:watch                       # vitest watch mode
pnpm dev:all                          # start API + browser-app concurrently
pnpm lint                             # biome check

pnpm --filter @ojfbot/gastown-pilot-api dev         # API only (tsx watch)
pnpm --filter @ojfbot/gastown-pilot-browser-app dev  # browser-app only (vite)
pnpm --filter @ojfbot/gastown-pilot-browser-app build && pnpm --filter @ojfbot/gastown-pilot-browser-app preview  # MF remote preview
```

## Architecture

Four packages in pnpm workspaces:

| Package | Port | Role |
|---------|------|------|
| `shared` | — | Common types, constants, Gas Town domain types |
| `agent-graph` | — | LangGraph state machine: prime node (A3 pattern), bead query, gt command, SSE relay |
| `api` | 3018 | Express server: three data adapters (gt CLI, Dolt SQL, SSE relay), Wasteland routes |
| `browser-app` | 3017 | React + Carbon UI: 6-tab dashboard, 12 panels, Module Federation remote |

### Three-layer data architecture

```
browser-app (React, Carbon, React Query)
  └── api (Express, port 3018)
        ├── GtCliAdapter      — mutations: sling, nudge, handoff, convoy create, wasteland actions
        ├── DoltSqlClient     — rich reads: agents, convoys, rigs, formulas, beads
        ├── SseRelayClient    — real-time: agent state, events, convoy progress (from gt dashboard)
        └── WastelandDoltClient — Wasteland reads: wanted board, character sheets, leaderboard
```

**Rule:** Mutations always go through gt CLI adapter. Reads go directly to Dolt. Real-time via SSE relay.

### Module Federation

Exposes `./Dashboard` and `./Settings` for shell integration. Shell loads at `http://localhost:3017/assets/remoteEntry.js`.

`cssInjectedByJs` must come BEFORE `federation` in vite.config.ts plugins. `@carbon/react` must be in the shared singleton map.

### Gas Town domain context

This app is the observability/control surface for Gas Town's multi-agent coordination layer. Read:
- `domain-knowledge/frame-os-context.md` — Frame OS context
- Core repo: `.claude/skills/gastown/knowledge/pilot-spec.md` — panel specs
- Core repo: `.claude/skills/gastown/knowledge/domain-model.md` — vocabulary map
- Core repo: `decisions/adr/0015-gas-town-paperclip-wasteland-adoption.md` — governing ADR

## Key conventions

- All Express routes require `authenticateJWT`. `MOCK_AUTH=true` in dev.
- Logging: `getLogger('module-name')` from `packages/api/src/utils/logger.ts`.
- LangGraph nodes: `async function myNode(state): Promise<Partial<State>>` — return partial state, never throw.
- Data hooks use `@tanstack/react-query` for server state. Redux only for UI state (active tab, selections).
- All data adapters are stubbed (SCAFFOLD markers). Wire to real gt CLI / Dolt when available.
- Frame vocabulary at boundaries: `worker` not polecat, `witness` not department head, `mayor` not CEO.

## Tabs and panels

| Tab | Panels |
|-----|--------|
| Town | AgentTree, ConvoyTracker, EventStream, ProblemsView |
| Rigs | RigOverview, HealthDashboard (drill-down), MergeQueue |
| Convoys | ConvoyTracker (expanded) |
| Beads | BeadExplorer (master-detail) |
| Formulas | FormulaLibrary, MoleculeDAG |
| Wasteland | WantedBoard, CharacterSheet, Leaderboard, RecentActivity |
