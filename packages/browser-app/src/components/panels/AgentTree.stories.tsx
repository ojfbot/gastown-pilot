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

/**
 * Full operational hierarchy — Mayor + Deacon at hq level,
 * then per-rig agent teams with mixed statuses.
 * Reflects a real mid-sprint operational state across 5 rigs.
 */
export const FullHierarchy: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'agents'], {
        agents: [
          // Town governance
          { id: 'mayor', name: 'Mayor', rig: 'hq', status: 'active', task: 'Monitoring convoy progress across 5 rigs' },
          { id: 'deacon', name: 'Deacon', rig: 'hq', status: 'active', task: 'Validating stamp submissions for Sprint-7' },
          // ojfbot-frame — healthy team
          { id: 'a1', name: 'scaffold-worker', rig: 'ojfbot-frame', status: 'active', task: 'Generating SettingsModal.stories.tsx' },
          { id: 'a2', name: 'test-runner', rig: 'ojfbot-frame', status: 'idle', task: '' },
          { id: 'a3', name: 'lint-patrol', rig: 'ojfbot-frame', status: 'active', task: 'Scanning packages/ui/ for unused imports' },
          { id: 'a8', name: 'ci-hardener', rig: 'ojfbot-frame', status: 'active', task: 'Adding continue-on-error to Docker steps' },
          // purefoy — one stalled
          { id: 'a4', name: 'doc-writer', rig: 'purefoy', status: 'stalled', task: 'Waiting for bbPress scrape to complete' },
          { id: 'a5', name: 'scraper-main', rig: 'purefoy', status: 'active', task: 'Scraping Roger Deakins Q&A thread #847' },
          // blogengine — one error
          { id: 'a6', name: 'deploy-agent', rig: 'blogengine', status: 'error', task: 'Build failed — missing env VITE_API_URL' },
          { id: 'a9', name: 'content-reviewer', rig: 'blogengine', status: 'active', task: 'Tone-checking draft post on AI agents' },
          { id: 'a10', name: 'story-writer', rig: 'blogengine', status: 'idle', task: '' },
          // tripplanner
          { id: 'a11', name: 'itinerary-agent', rig: 'tripplanner', status: 'active', task: 'Generating Tokyo 5-day budget itinerary' },
          { id: 'a12', name: 'ci-watcher', rig: 'tripplanner', status: 'active', task: 'Monitoring PR #31 type-check run' },
          // cv-builder
          { id: 'a13', name: 'resume-optimizer', rig: 'cv-builder', status: 'active', task: 'Tailoring resume for TBCoNY application' },
          { id: 'a14', name: 'visual-tester', rig: 'cv-builder', status: 'idle', task: '' },
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

/** Minimal — single rig with 2 agents */
export const SingleRig: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'agents'], {
        agents: [
          { id: 'a1', name: 'scaffold-worker', rig: 'ojfbot-frame', status: 'active', task: 'Generating Storybook config' },
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
