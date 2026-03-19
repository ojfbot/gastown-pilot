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

/** With data — AgentTree, ConvoyTracker, ProblemsView, EventStream all populated */
export const WithData: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'agents'], {
        agents: [
          { id: 'a1', name: 'scaffold-worker', rig: 'ojfbot-frame', status: 'active', task: 'Generating Storybook stories' },
          { id: 'a2', name: 'test-runner', rig: 'ojfbot-frame', status: 'idle', task: '' },
          { id: 'a3', name: 'doc-writer', rig: 'purefoy', status: 'stalled', task: 'Waiting for scrape' },
        ],
      })
      client.setQueryData(['gastown', 'convoys'], {
        convoys: [
          { id: 'c1', title: 'Sprint-6: Storybook setup', total: 8, done: 5, active: 2, blocked: 0, status: 'active' },
          { id: 'c2', title: 'Sprint-5: Wasteland', total: 6, done: 6, active: 0, blocked: 0, status: 'completed' },
        ],
      })
      client.setQueryData(['gastown', 'events'], {
        events: [
          { type: 'convoy:start', timestamp: '2026-03-19T10:00:00Z', summary: 'Convoy Sprint-6 started' },
          { type: 'bead:complete', timestamp: '2026-03-19T10:05:00Z', summary: 'Bead GT-042 done' },
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
