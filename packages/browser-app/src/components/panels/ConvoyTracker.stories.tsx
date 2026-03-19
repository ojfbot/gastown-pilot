import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ConvoyTracker from './ConvoyTracker'

const makeClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })

const meta: Meta<typeof ConvoyTracker> = {
  title: 'Panels/ConvoyTracker',
  component: ConvoyTracker,
  decorators: [
    (Story) => (
      <QueryClientProvider client={makeClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ConvoyTracker>

/** Loading state */
export const Loading: Story = {}

/** Active convoys with progress */
export const WithConvoys: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'convoys'], {
        convoys: [
          { id: 'c1', title: 'Sprint-6: Storybook + visual tests', total: 8, done: 3, active: 2, blocked: 0, status: 'active' },
          { id: 'c2', title: 'Sprint-5: Wasteland integration', total: 6, done: 6, active: 0, blocked: 0, status: 'completed' },
          { id: 'c3', title: 'Hotfix: SSE relay reconnect', total: 3, done: 1, active: 1, blocked: 1, status: 'stalled' },
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

/** Empty — no active convoys */
export const Empty: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'convoys'], { convoys: [] })
      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}
