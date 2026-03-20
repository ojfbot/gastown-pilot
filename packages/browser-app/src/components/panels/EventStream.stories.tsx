import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import EventStream from './EventStream'

const makeClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })

const meta: Meta<typeof EventStream> = {
  title: 'Panels/EventStream',
  component: EventStream,
  decorators: [
    (Story) => (
      <QueryClientProvider client={makeClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof EventStream>

/** Default — loading state (no API available) */
export const Loading: Story = {}

/**
 * Rich event stream — shows full range of Gas Town event types
 * during an active sprint morning.
 */
export const WithEvents: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'events'], {
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
          { type: 'mail:sent', timestamp: '2026-03-20T09:46:00Z', summary: 'Mayor → deploy-agent: "Check .env.production for missing vars"' },
          { type: 'bead:complete', timestamp: '2026-03-20T09:50:00Z', summary: 'GT-058 "SettingsModal.stories.tsx" marked done by scaffold-worker' },
          { type: 'convoy:merge', timestamp: '2026-03-19T18:00:00Z', summary: 'Convoy "Sprint-6: Container/presenter decomposition" merged — 8/8 beads, 4 PRs shipped' },
          { type: 'agent:spawn', timestamp: '2026-03-19T17:00:00Z', summary: 'Agent visual-tester spawned on rig cv-builder' },
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

/** Empty — no events yet */
export const Empty: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'events'], { events: [] })
      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}
