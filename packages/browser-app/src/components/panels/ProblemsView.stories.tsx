import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProblemsView from './ProblemsView'

const makeClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })

const meta: Meta<typeof ProblemsView> = {
  title: 'Panels/ProblemsView',
  component: ProblemsView,
  decorators: [
    (Story) => (
      <QueryClientProvider client={makeClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProblemsView>

/** No problems — all agents healthy */
export const NoProblem: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'agents'], {
        agents: [
          { id: 'a1', name: 'scaffold-worker', rig: 'ojfbot-frame', status: 'active', task: 'Writing CI pipeline' },
          { id: 'a2', name: 'test-runner', rig: 'ojfbot-frame', status: 'idle', task: '' },
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

/** Multiple problems — stalled, error, and dead agents across rigs */
export const WithProblems: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'agents'], {
        agents: [
          { id: 'a1', name: 'scaffold-worker', rig: 'ojfbot-frame', status: 'active', task: 'Writing CI pipeline' },
          { id: 'a2', name: 'test-runner', rig: 'ojfbot-frame', status: 'idle', task: '' },
          {
            id: 'a4', name: 'doc-writer', rig: 'purefoy', status: 'stalled',
            task: 'Waiting for bbPress scrape to complete',
            stallDuration: '7m 30s',
            stalledSince: '2026-03-19T10:15:00Z',
          },
          {
            id: 'a6', name: 'deploy-agent', rig: 'blogengine', status: 'error',
            task: 'Build failed — missing env VITE_API_URL',
          },
          {
            id: 'a7', name: 'ci-watcher', rig: 'tripplanner', status: 'dead',
            task: 'Lost heartbeat after OOM kill',
            stallDuration: '45m',
          },
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

/** Single stalled agent */
export const SingleProblem: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'agents'], {
        agents: [
          { id: 'a1', name: 'scaffold-worker', rig: 'ojfbot-frame', status: 'active', task: 'Writing CI pipeline' },
          {
            id: 'a4', name: 'doc-writer', rig: 'purefoy', status: 'stalled',
            task: 'Blocked on PR review — waiting for maintainer approval',
            stallDuration: '12m 15s',
            stalledSince: '2026-03-19T10:18:00Z',
          },
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
