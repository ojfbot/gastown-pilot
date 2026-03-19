import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WastelandView from './WastelandView'

const makeClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })

const meta: Meta<typeof WastelandView> = {
  title: 'Panels/WastelandView',
  component: WastelandView,
  decorators: [
    (Story) => (
      <QueryClientProvider client={makeClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof WastelandView>

/** Loading state — all sub-tabs fetching */
export const Loading: Story = {}

/** With data across all sub-tabs */
export const WithData: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['wasteland', 'wanted', undefined], {
        items: [
          { id: 'w1', title: 'Fix SSE relay reconnect logic', description: 'Handle dropped WebSocket', effort: 'M', tags: ['bug'], status: 'open', poster: 'ojfbot-frame' },
          { id: 'w2', title: 'Add Dolt migration for stamps table', description: 'Schema evolution', effort: 'S', tags: ['infra'], status: 'claimed', poster: 'purefoy', claimant: 'blogengine' },
          { id: 'w3', title: 'Implement trust tier promotion', description: 'Auto-promote after 5 stamps', effort: 'L', tags: ['feature'], status: 'open', poster: 'ojfbot-frame' },
          { id: 'w4', title: 'Patrol: clean up stale wanted items', description: 'Auto-close after 30 days', effort: 'S', tags: ['patrol'], status: 'completed', poster: 'ojfbot-frame' },
        ],
      })
      client.setQueryData(['wasteland', 'sheet', 'ojfbot-frame'], {
        rigHandle: 'ojfbot-frame',
        trustTier: 'maintainer',
        totalScore: 847,
        stampCount: 12,
        completedItems: 9,
        skills: { quality: 78, reliability: 92, creativity: 65 },
      })
      client.setQueryData(['wasteland', 'leaderboard'], {
        leaderboard: [
          { handle: 'ojfbot-frame', score: 847 },
          { handle: 'purefoy', score: 423 },
          { handle: 'blogengine', score: 312 },
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

/** Empty — no wanted items, no character sheet */
export const Empty: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['wasteland', 'wanted', undefined], { items: [] })
      client.setQueryData(['wasteland', 'sheet', 'ojfbot-frame'], null)
      client.setQueryData(['wasteland', 'leaderboard'], { leaderboard: [] })
      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}
