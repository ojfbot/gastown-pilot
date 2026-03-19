import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AgentTree from './AgentTree'

const makeClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })

const meta: Meta<typeof AgentTree> = {
  title: 'Panels/AgentTree',
  component: AgentTree,
  decorators: [
    (Story) => (
      <QueryClientProvider client={makeClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AgentTree>

/** Loading state */
export const Loading: Story = {}

/** With agents grouped by rig */
export const WithAgents: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'agents'], {
        agents: [
          { id: 'a1', name: 'scaffold-worker', rig: 'ojfbot-frame', status: 'active', task: 'Generating Storybook config for gastown-pilot' },
          { id: 'a2', name: 'test-runner', rig: 'ojfbot-frame', status: 'idle', task: '' },
          { id: 'a3', name: 'lint-patrol', rig: 'ojfbot-frame', status: 'active', task: 'Scanning src/ for unused imports' },
          { id: 'a4', name: 'doc-writer', rig: 'purefoy', status: 'stalled', task: 'Waiting for bbPress scrape to complete' },
          { id: 'a5', name: 'scraper-main', rig: 'purefoy', status: 'active', task: 'Scraping Roger Deakins Q&A thread #847' },
          { id: 'a6', name: 'deploy-agent', rig: 'blogengine', status: 'error', task: 'Build failed — missing env VITE_API_URL' },
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

/** Empty — no agents registered */
export const Empty: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'agents'], { agents: [] })
      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}
