# Gas Town Pilot

> Observability and control dashboard for Frame OS multi-agent coordination.

**Status:** Scaffolded with full architecture. Panel stubs render with placeholder data while the `gt` CLI and Dolt database are under development.

Gas Town Pilot is the control surface for Frame OS's multi-agent coordination layer. It provides a 6-tab dashboard with 12 panels spanning agent trees, convoy tracking, formula management, and the Wasteland game layer. Data flows through a three-layer architecture: mutations via the `gt` CLI, rich reads from Dolt SQL, and real-time updates via SSE relay.

## Features

- **6-tab dashboard** — Town, Rigs, Convoys, Beads, Formulas, Wasteland
- **12 panels** — from agent trees to leaderboards (see Tabs section below)
- **Three-layer data architecture** — gt CLI mutations, Dolt SQL reads, SSE real-time
- **Wasteland game layer** — wanted board, character sheets, leaderboards
- **React Query** — server state management with optimistic updates
- **Module Federation remote** — renders inside the Frame OS shell

## Tabs

| Tab | Panels |
|-----|--------|
| Town | AgentTree, ConvoyTracker, EventStream, ProblemsView |
| Rigs | RigOverview, HealthDashboard, MergeQueue |
| Convoys | ConvoyTracker (expanded) |
| Beads | BeadExplorer (master-detail) |
| Formulas | FormulaLibrary, MoleculeDAG |
| Wasteland | WantedBoard, CharacterSheet, Leaderboard, RecentActivity |

## Architecture

```
browser-app (React + Carbon, port 3017)
  └── api (Express, port 3018)
        ├── GtCliAdapter      — mutations: sling, nudge, handoff, convoy create
        ├── DoltSqlClient     — reads: agents, convoys, rigs, formulas, beads
        ├── SseRelayClient    — real-time: agent state, events, convoy progress
        └── WastelandDoltClient — Wasteland reads: wanted board, character sheets
```

**Rule:** Mutations go through the gt CLI adapter. Reads go directly to Dolt. Real-time via SSE relay.

### Packages

| Package | Port | Role |
|---------|------|------|
| `shared` | — | Gas Town domain types, constants |
| `agent-graph` | — | LangGraph state machine: prime node, bead query, gt command, SSE relay |
| `api` | 3018 | Express server with three data adapters + Wasteland routes |
| `browser-app` | 3017 | React + Carbon UI, 6-tab dashboard, Module Federation remote |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite 5, Module Federation |
| UI | React 18, Carbon Design System |
| State | React Query (server), Redux Toolkit (UI) |
| Data | Dolt SQL (reads), gt CLI (mutations), SSE (real-time) |
| AI | LangGraph, routed through frame-agent |
| Language | TypeScript |

## Getting Started

**Prerequisites:** Node >= 24 (via `fnm use`), pnpm 9

```bash
pnpm install
pnpm dev:all    # API on :3018, frontend on :3017
```

All data adapters are currently stubbed with scaffold markers. Panels render with placeholder data.

## Roadmap

- [x] Monorepo scaffold (4 packages)
- [x] Module Federation remote registered in shell
- [x] 6-tab layout with 12 panel stubs
- [x] Three-layer data adapter architecture
- [x] Gas Town domain types
- [ ] Wire GtCliAdapter to real gt CLI
- [ ] Wire DoltSqlClient to live Dolt database
- [ ] SSE relay integration
- [ ] Wasteland game mechanics
- [ ] LangGraph agent integration via frame-agent

## License

MIT

## Frame OS Ecosystem

Part of [Frame OS](https://github.com/ojfbot/shell) — an AI-native application OS.

| Repo | Description |
|------|-------------|
| [shell](https://github.com/ojfbot/shell) | Module Federation host + frame-agent LLM gateway |
| [core](https://github.com/ojfbot/core) | Workflow framework — 30+ slash commands + TypeScript engine |
| [cv-builder](https://github.com/ojfbot/cv-builder) | AI-powered resume builder with LangGraph agents |
| [blogengine](https://github.com/ojfbot/BlogEngine) | AI blog content creation platform |
| [TripPlanner](https://github.com/ojfbot/TripPlanner) | AI trip planner with 11-phase pipeline |
| [core-reader](https://github.com/ojfbot/core-reader) | Documentation viewer for the core framework |
| [lean-canvas](https://github.com/ojfbot/lean-canvas) | AI-powered lean canvas business model tool |
| **gastown-pilot** | **Multi-agent coordination dashboard (this repo)** |
| [seh-study](https://github.com/ojfbot/seh-study) | NASA SEH spaced repetition study tool |
| [daily-logger](https://github.com/ojfbot/daily-logger) | Automated daily dev blog pipeline |
| [purefoy](https://github.com/ojfbot/purefoy) | Roger Deakins cinematography knowledge base |
| [MrPlug](https://github.com/ojfbot/MrPlug) | Chrome extension for AI UI feedback |
| [frame-ui-components](https://github.com/ojfbot/frame-ui-components) | Shared component library (Carbon DS) |
