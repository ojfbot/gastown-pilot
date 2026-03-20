import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import BeadsView from './BeadsView'

const makeClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })

const meta: Meta<typeof BeadsView> = {
  title: 'Panels/BeadsView',
  component: BeadsView,
  decorators: [
    (Story) => (
      <QueryClientProvider client={makeClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof BeadsView>

/** Loading state */
export const Loading: Story = {}

/**
 * Realistic bead set — mirrors actual Frame OS work items across Sprint 7.
 * Mixed types (task, bug, expansion, patrol, adr, convoy) with status + labels.
 */
export const WithBeads: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'beads', {}], {
        beads: [
          { id: 'GT-042', type: 'task', title: 'Add Storybook config to gastown-pilot', status: 'closed', actor: 'scaffold-worker', labels: { convoy: 'c1' } },
          { id: 'GT-043', type: 'task', title: 'Write stories for all 12 panel components', status: 'closed', actor: 'scaffold-worker', labels: { convoy: 'c1' } },
          { id: 'GT-044', type: 'bug', title: 'SSE relay drops connection after 60s idle', status: 'live', actor: 'ci-hardener', labels: { convoy: 'c3', severity: 'high' } },
          { id: 'GT-045', type: 'expansion', title: 'Molecule DAG visualization with dagre-d3', status: 'created', labels: { phase: '2' } },
          { id: 'GT-046', type: 'patrol', title: 'Lint sweep — remove unused imports in panels/', status: 'closed', actor: 'lint-patrol' },
          { id: 'GT-047', type: 'task', title: 'Wire Wasteland sync button to POST /api/commands', status: 'live', actor: 'scaffold-worker', labels: { convoy: 'c4' } },
          { id: 'GT-048', type: 'adr', title: 'ADR-0029: prop-only boundary for @ojfbot/shell', status: 'closed', actor: 'scaffold-worker' },
          { id: 'GT-049', type: 'task', title: 'Register lean-canvas in shell MF remotes', status: 'closed', actor: 'scaffold-worker', labels: { convoy: 'c1' } },
          { id: 'GT-050', type: 'task', title: 'CI gate: Storybook build in cv-builder', status: 'closed', actor: 'ci-hardener', labels: { convoy: 'c1' } },
          { id: 'GT-051', type: 'task', title: 'CI gate: Storybook build in blogengine', status: 'closed', actor: 'ci-hardener', labels: { convoy: 'c1' } },
          { id: 'GT-052', type: 'bug', title: 'Docker visual regression fails in CI — container startup', status: 'closed', actor: 'ci-hardener', labels: { convoy: 'c1' } },
          { id: 'GT-053', type: 'task', title: 'TripPlanner CI: pre-build agent-graph for type-check', status: 'closed', actor: 'ci-hardener', labels: { convoy: 'c1' } },
          { id: 'GT-054', type: 'convoy', title: 'Sprint-7: Storybook + CI hardening', status: 'live', labels: { total: '12', done: '7' } },
          { id: 'GT-055', type: 'task', title: 'Write SettingsModal.stories.tsx for shell', status: 'live', actor: 'scaffold-worker', labels: { convoy: 'c4' } },
          { id: 'GT-056', type: 'task', title: 'Enhance gastown-pilot mock data — realistic rigs', status: 'live', actor: 'scaffold-worker', labels: { convoy: 'c4' } },
          { id: 'GT-057', type: 'expansion', title: 'Formulas directory with TOML workflow definitions', status: 'created', labels: { convoy: 'c4' } },
          { id: 'GT-058', type: 'molecule', title: 'mol-storybook-rollout: cross-repo Storybook adoption', status: 'live', labels: { formula: 'scaffold-app', steps_done: '7', steps_total: '12' } },
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

/** Empty — no beads in store */
export const Empty: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'beads', {}], { beads: [] })
      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}
