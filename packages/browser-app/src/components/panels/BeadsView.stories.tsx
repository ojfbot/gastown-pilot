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

/** With beads — master list populated */
export const WithBeads: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'beads', {}], {
        beads: [
          { id: 'GT-042', type: 'task', title: 'Add Storybook config to gastown-pilot' },
          { id: 'GT-043', type: 'task', title: 'Write stories for all panel components' },
          { id: 'GT-044', type: 'bug', title: 'SSE relay drops connection after 60s idle' },
          { id: 'GT-045', type: 'expansion', title: 'Molecule DAG visualization with dagre-d3' },
          { id: 'GT-046', type: 'patrol', title: 'Lint sweep — remove unused imports in panels/' },
          { id: 'GT-047', type: 'task', title: 'Wire Wasteland sync button to POST /api/commands' },
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
