import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ConvoysView from './ConvoysView'

const makeClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })

const meta: Meta<typeof ConvoysView> = {
  title: 'Panels/ConvoysView',
  component: ConvoysView,
  decorators: [
    (Story) => (
      <QueryClientProvider client={makeClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ConvoysView>

/** Loading state */
export const Loading: Story = {}

/** With convoys — tracker + management stub */
export const WithConvoys: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'convoys'], {
        convoys: [
          { id: 'c1', title: 'Sprint-6: Storybook + visual tests', total: 8, done: 3, active: 2, blocked: 0, status: 'active' },
          { id: 'c2', title: 'Hotfix: SSE relay reconnect', total: 3, done: 1, active: 1, blocked: 1, status: 'stalled' },
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

/** Empty — no convoys */
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
