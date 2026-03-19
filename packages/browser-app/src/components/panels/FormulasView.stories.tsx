import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FormulasView from './FormulasView'
import type { FormulaDefinition } from '@ojfbot/gastown-pilot-shared'

const makeClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })

const sampleFormulas: FormulaDefinition[] = [
  {
    name: 'scaffold-app',
    type: 'workflow',
    version: 1,
    description: 'Scaffold a new Frame OS application from a canonical template',
    source: 'embedded',
    steps: [
      { id: 's1', title: 'Create directory structure', needs: [], acceptanceCriteria: ['All directories exist'] },
      { id: 's2', title: 'Generate package.json', needs: ['s1'], acceptanceCriteria: ['Valid JSON', 'Correct name'] },
      { id: 's3', title: 'Write tsconfig', needs: ['s1'], acceptanceCriteria: ['Extends base config'] },
      { id: 's4', title: 'Install dependencies', needs: ['s2'], acceptanceCriteria: ['pnpm install succeeds'] },
    ],
  },
  {
    name: 'deploy-demo',
    type: 'workflow',
    version: 2,
    description: 'Deploy a demo instance to Vercel with preview URL',
    source: 'embedded',
    steps: [
      { id: 'd1', title: 'Build artifacts', needs: [], acceptanceCriteria: ['Build exits 0'] },
      { id: 'd2', title: 'Run smoke tests', needs: ['d1'], acceptanceCriteria: ['All tests pass'] },
      { id: 'd3', title: 'Deploy to Vercel', needs: ['d2'], acceptanceCriteria: ['Preview URL accessible'] },
    ],
  },
  {
    name: 'wasteland-patrol',
    type: 'patrol',
    version: 1,
    description: 'Scan Wasteland Dolt database for stale wanted items and auto-close expired bounties',
    source: 'custom',
    steps: [
      { id: 'w1', title: 'Query wanted table', needs: [], acceptanceCriteria: ['Query returns results'] },
      { id: 'w2', title: 'Filter expired items', needs: ['w1'], acceptanceCriteria: ['Expiry logic correct'] },
      { id: 'w3', title: 'Close expired bounties', needs: ['w2'], acceptanceCriteria: ['Status updated to closed'] },
    ],
  },
]

const meta: Meta<typeof FormulasView> = {
  title: 'Panels/FormulasView',
  component: FormulasView,
  decorators: [
    (Story) => (
      <QueryClientProvider client={makeClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormulasView>

/** Loading state */
export const Loading: Story = {}

/** With formulas — library list + DAG placeholder */
export const WithFormulas: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'formulas'], { formulas: sampleFormulas })
      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}

/** Empty — no formulas loaded */
export const Empty: Story = {
  decorators: [
    (Story) => {
      const client = makeClient()
      client.setQueryData(['gastown', 'formulas'], { formulas: [] })
      return (
        <QueryClientProvider client={client}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}
