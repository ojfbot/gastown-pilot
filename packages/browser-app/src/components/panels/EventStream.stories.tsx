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
 * With events — mock the fetch to return sample events.
 * Uses MSW or manual fetch mock in beforeEach.
 */
export const WithEvents: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'events'], {
        events: [
          { type: 'convoy:start', timestamp: '2026-03-19T10:00:00Z', summary: 'Convoy "Sprint-6" started with 4 beads' },
          { type: 'agent:spawn', timestamp: '2026-03-19T10:01:00Z', summary: 'Agent scaffold-worker spawned on rig ojfbot-frame' },
          { type: 'bead:complete', timestamp: '2026-03-19T10:05:00Z', summary: 'Bead GT-042 "Add Storybook config" marked done' },
          { type: 'convoy:merge', timestamp: '2026-03-19T10:12:00Z', summary: 'Convoy "Sprint-5" merged — 6/6 beads complete' },
          { type: 'agent:stall', timestamp: '2026-03-19T10:15:00Z', summary: 'Agent test-runner stalled on rig purefoy — timeout 300s' },
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
