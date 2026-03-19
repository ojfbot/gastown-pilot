import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RigsView from './RigsView'

const makeClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })

const meta: Meta<typeof RigsView> = {
  title: 'Panels/RigsView',
  component: RigsView,
  decorators: [
    (Story) => (
      <QueryClientProvider client={makeClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof RigsView>

/** Loading state */
export const Loading: Story = {}

/** Rig cards with mixed health statuses */
export const WithRigs: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'rigs'], {
        rigs: [
          { name: 'ojfbot-frame', gitUrl: 'https://github.com/ojfbot/shell', agentCount: 4, health: 'healthy', activeConvoys: 2, mergeQueueDepth: 1 },
          { name: 'purefoy', gitUrl: 'https://github.com/ojfbot/purefoy', agentCount: 2, health: 'degraded', activeConvoys: 1, mergeQueueDepth: 3 },
          { name: 'blogengine', gitUrl: 'https://github.com/ojfbot/blogengine', agentCount: 3, health: 'healthy', activeConvoys: 1, mergeQueueDepth: 0 },
          { name: 'tripplanner', gitUrl: 'https://github.com/ojfbot/TripPlanner', agentCount: 1, health: 'unhealthy', activeConvoys: 0, mergeQueueDepth: 5 },
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

/** Empty — no rigs */
export const Empty: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'rigs'], { rigs: [] })
      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}
