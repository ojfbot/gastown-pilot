import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TownView from './TownView'

const makeClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })

const meta: Meta<typeof TownView> = {
  title: 'Panels/TownView',
  component: TownView,
  decorators: [
    (Story) => (
      <QueryClientProvider client={makeClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TownView>

/** Loading — all four sub-panels in loading state */
export const Loading: Story = {}

/**
 * Operational snapshot — what a real Gas Town dashboard looks like at 10:30 AM
 * during Sprint 7 (Storybook + visual regression + CI hardening).
 */
export const Operational: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'agents'], {
        agents: [
          // Town-level governance
          { id: 'mayor', name: 'Mayor', rig: 'hq', status: 'active', task: 'Monitoring convoy progress across 5 rigs' },
          { id: 'deacon', name: 'Deacon', rig: 'hq', status: 'active', task: 'Validating stamp submissions for Sprint-6' },
          // ojfbot-frame (shell) — 4 agents
          { id: 'a1', name: 'scaffold-worker', rig: 'ojfbot-frame', status: 'active', task: 'Generating SettingsModal.stories.tsx' },
          { id: 'a2', name: 'test-runner', rig: 'ojfbot-frame', status: 'idle', task: '' },
          { id: 'a3', name: 'lint-patrol', rig: 'ojfbot-frame', status: 'active', task: 'Scanning packages/ui/ for unused imports' },
          { id: 'a8', name: 'ci-hardener', rig: 'ojfbot-frame', status: 'active', task: 'Adding continue-on-error to Docker steps' },
          // purefoy — 2 agents (one stalled)
          { id: 'a4', name: 'doc-writer', rig: 'purefoy', status: 'stalled', task: 'Waiting for bbPress scrape to complete', stallDuration: '7m 30s' },
          { id: 'a5', name: 'scraper-main', rig: 'purefoy', status: 'active', task: 'Scraping Roger Deakins Q&A thread #847' },
          // blogengine — 3 agents (one in error)
          { id: 'a6', name: 'deploy-agent', rig: 'blogengine', status: 'error', task: 'Build failed — missing env VITE_API_URL' },
          { id: 'a9', name: 'content-reviewer', rig: 'blogengine', status: 'active', task: 'Tone-checking draft post on AI agents' },
          { id: 'a10', name: 'story-writer', rig: 'blogengine', status: 'idle', task: '' },
          // tripplanner — 2 agents
          { id: 'a11', name: 'itinerary-agent', rig: 'tripplanner', status: 'active', task: 'Generating Tokyo 5-day budget itinerary' },
          { id: 'a12', name: 'ci-watcher', rig: 'tripplanner', status: 'active', task: 'Monitoring PR #31 type-check run' },
          // cv-builder — 2 agents
          { id: 'a13', name: 'resume-optimizer', rig: 'cv-builder', status: 'active', task: 'Tailoring resume for TBCoNY application' },
          { id: 'a14', name: 'visual-tester', rig: 'cv-builder', status: 'idle', task: '' },
        ],
      })
      client.setQueryData(['gastown', 'convoys'], {
        convoys: [
          { id: 'c1', title: 'Sprint-7: Storybook + CI hardening', total: 12, done: 7, active: 3, blocked: 1, status: 'active' },
          { id: 'c2', title: 'Sprint-6: Container/presenter decomposition', total: 8, done: 8, active: 0, blocked: 0, status: 'completed' },
          { id: 'c3', title: 'Hotfix: SSE relay reconnect', total: 3, done: 1, active: 1, blocked: 1, status: 'stalled' },
          { id: 'c4', title: 'Sprint-8: Gas Town mock data + formulas', total: 6, done: 0, active: 2, blocked: 0, status: 'active' },
        ],
      })
      client.setQueryData(['gastown', 'events'], {
        events: [
          { type: 'convoy:start', timestamp: '2026-03-20T09:00:00Z', summary: 'Convoy "Sprint-8: Gas Town mock data" started with 6 beads' },
          { type: 'bead:complete', timestamp: '2026-03-20T09:45:00Z', summary: 'GT-058 "SettingsModal.stories.tsx" marked done by scaffold-worker' },
          { type: 'agent:spawn', timestamp: '2026-03-20T09:30:00Z', summary: 'Agent ci-hardener spawned on rig ojfbot-frame' },
          { type: 'bead:complete', timestamp: '2026-03-20T09:15:00Z', summary: 'GT-055 "ADR-0029 prop-only boundary" filed by scaffold-worker' },
          { type: 'convoy:merge', timestamp: '2026-03-19T18:00:00Z', summary: 'Convoy "Sprint-6" merged — 8/8 beads complete, 4 PRs shipped' },
          { type: 'agent:stall', timestamp: '2026-03-20T09:22:00Z', summary: 'Agent doc-writer stalled on rig purefoy — waiting on scraper-main' },
          { type: 'agent:error', timestamp: '2026-03-20T08:55:00Z', summary: 'Agent deploy-agent error on rig blogengine — VITE_API_URL not set' },
          { type: 'molecule:step_done', timestamp: '2026-03-20T09:40:00Z', summary: 'Molecule mol-storybook-rollout step "add-ci-gate" completed' },
          { type: 'mail:sent', timestamp: '2026-03-20T09:35:00Z', summary: 'Mayor → deploy-agent: "Check .env.production for missing vars"' },
          { type: 'hook:assigned', timestamp: '2026-03-20T09:10:00Z', summary: 'Hook GT-059 assigned to ci-hardener on ojfbot-frame' },
          { type: 'bead:updated', timestamp: '2026-03-20T08:50:00Z', summary: 'GT-044 "SSE relay reconnect" status changed to blocked' },
          { type: 'molecule:started', timestamp: '2026-03-20T09:00:00Z', summary: 'Molecule mol-gastown-mock-data poured from formula "gastown-pilot-setup"' },
        ],
      })
      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}

/** Empty — all sub-panels show empty states */
export const Empty: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'agents'], { agents: [] })
      client.setQueryData(['gastown', 'convoys'], { convoys: [] })
      client.setQueryData(['gastown', 'events'], { events: [] })
      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}
