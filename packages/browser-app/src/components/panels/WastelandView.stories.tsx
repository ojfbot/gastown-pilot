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

/** Full Wasteland data — wanted board, character sheet, expanded leaderboard, activity */
export const WithData: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['wasteland', 'wanted', undefined], {
        items: [
          { id: 'w1', title: 'Fix SSE relay reconnect logic', description: 'Handle dropped WebSocket gracefully with exponential backoff and heartbeat detection', effort: 'M', tags: ['bug', 'infra'], status: 'open', poster: 'ojfbot-frame' },
          { id: 'w2', title: 'Add Dolt migration for stamps table', description: 'Schema evolution: add confidence + severity columns to stamps table', effort: 'S', tags: ['infra', 'dolt'], status: 'claimed', poster: 'purefoy', claimant: 'blogengine' },
          { id: 'w3', title: 'Implement trust tier auto-promotion', description: 'Auto-promote rigs from registered → contributor after 5 validated stamps', effort: 'L', tags: ['feature', 'governance'], status: 'open', poster: 'ojfbot-frame' },
          { id: 'w4', title: 'Patrol: clean up stale wanted items >30 days', description: 'Auto-close wanted items with no claims after 30 days', effort: 'S', tags: ['patrol'], status: 'completed', poster: 'ojfbot-frame' },
          { id: 'w5', title: 'WastelandBoard read-only viewer for shell', description: 'Embed Wasteland leaderboard + wanted board in shell settings panel', effort: 'M', tags: ['feature', 'shell'], status: 'claimed', poster: 'ojfbot-frame', claimant: 'tripplanner' },
          { id: 'w6', title: 'Cross-rig convoy assignment protocol', description: 'Allow Mayor to assign beads from one rig to agents on another rig via mail', effort: 'L', tags: ['feature', 'coordination'], status: 'open', poster: 'ojfbot-frame' },
          { id: 'w7', title: 'Stamp dispute resolution flow', description: 'When a rig disputes a stamp score, route to Deacon for arbitration', effort: 'M', tags: ['governance'], status: 'in_review', poster: 'purefoy', claimant: 'ojfbot-frame' },
          { id: 'w8', title: 'Visual regression baseline for gastown-pilot', description: 'Generate Storybook snapshots for all 12 panels using jest-image-snapshot', effort: 'S', tags: ['testing'], status: 'completed', poster: 'ojfbot-frame' },
        ],
      })
      client.setQueryData(['wasteland', 'sheet', 'ojfbot-frame'], {
        rigHandle: 'ojfbot-frame',
        trustTier: 'maintainer',
        totalScore: 847,
        stampCount: 12,
        completedItems: 9,
        skills: { quality: 78, reliability: 92, creativity: 65 },
        recentStamps: [
          { id: 'st-012', quality: 90, reliability: 95, creativity: 80, validator: 'purefoy-witness', date: '2026-03-19T14:00:00Z', completionTitle: 'Sprint-6 container/presenter decomposition' },
          { id: 'st-011', quality: 85, reliability: 88, creativity: 72, validator: 'blogengine-witness', date: '2026-03-18T16:30:00Z', completionTitle: 'Storybook CI gates for all repos' },
          { id: 'st-010', quality: 70, reliability: 95, creativity: 60, validator: 'tripplanner-witness', date: '2026-03-17T11:00:00Z', completionTitle: 'Fix TripPlanner CI type-check ordering' },
        ],
      })
      client.setQueryData(['wasteland', 'leaderboard'], {
        leaderboard: [
          { handle: 'ojfbot-frame', score: 847, stampCount: 12, completedItems: 9, trustTier: 'maintainer' },
          { handle: 'purefoy', score: 423, stampCount: 7, completedItems: 5, trustTier: 'contributor' },
          { handle: 'blogengine', score: 312, stampCount: 5, completedItems: 4, trustTier: 'contributor' },
          { handle: 'tripplanner', score: 198, stampCount: 3, completedItems: 2, trustTier: 'registered' },
          { handle: 'cv-builder', score: 156, stampCount: 2, completedItems: 2, trustTier: 'registered' },
          { handle: 'daily-logger', score: 89, stampCount: 1, completedItems: 1, trustTier: 'registered' },
          { handle: 'gastown-pilot', score: 45, stampCount: 1, completedItems: 0, trustTier: 'registered' },
          { handle: 'frame-ui-components', score: 22, stampCount: 0, completedItems: 0, trustTier: 'registered' },
        ],
      })
      client.setQueryData(['wasteland', 'activity'], {
        activity: [
          { type: 'stamped', rigHandle: 'purefoy', wantedTitle: 'Sprint-6 container/presenter decomposition', quality: 90, reliability: 95, creativity: 80, timestamp: '2026-03-19T14:00:00Z' },
          { type: 'completed', rigHandle: 'ojfbot-frame', wantedTitle: 'Visual regression baseline for gastown-pilot', timestamp: '2026-03-19T12:30:00Z' },
          { type: 'claimed', rigHandle: 'tripplanner', wantedTitle: 'WastelandBoard read-only viewer for shell', timestamp: '2026-03-19T11:15:00Z' },
          { type: 'stamped', rigHandle: 'blogengine', wantedTitle: 'Storybook CI gates for all repos', quality: 85, reliability: 88, creativity: 72, timestamp: '2026-03-18T16:30:00Z' },
          { type: 'completed', rigHandle: 'blogengine', wantedTitle: 'Add Dolt migration for stamps table', timestamp: '2026-03-18T15:00:00Z' },
          { type: 'completed', rigHandle: 'ojfbot-frame', wantedTitle: 'Patrol: clean up stale wanted items', timestamp: '2026-03-18T10:00:00Z' },
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
