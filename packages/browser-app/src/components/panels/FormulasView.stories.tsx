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
    description: 'Scaffold a new Frame OS application — monorepo structure, MF config, CI pipeline, shell registration',
    source: 'embedded',
    steps: [
      { id: 'create-dirs', title: 'Create monorepo directory structure', needs: [], acceptanceCriteria: ['packages/browser-app exists', 'packages/api exists'] },
      { id: 'gen-package-json', title: 'Generate package.json files', needs: ['create-dirs'], acceptanceCriteria: ['Valid JSON', 'pnpm workspace configured'] },
      { id: 'write-tsconfig', title: 'Write TypeScript configs', needs: ['create-dirs'], acceptanceCriteria: ['Extends base config'] },
      { id: 'add-mf-config', title: 'Configure Module Federation remote', needs: ['gen-package-json'], acceptanceCriteria: ['federation() plugin', 'exposes ./Dashboard'] },
      { id: 'add-storybook', title: 'Add Storybook ~8.4.0', needs: ['gen-package-json'], acceptanceCriteria: ['build-storybook exits 0'] },
      { id: 'add-ci', title: 'Create CI workflow with Storybook gate', needs: ['add-storybook'], acceptanceCriteria: ['ci.yml exists'] },
      { id: 'register-in-shell', title: 'Wire into shell MF host', needs: ['add-mf-config'], acceptanceCriteria: ['5 registration points wired'] },
      { id: 'install-deps', title: 'Install and verify build', needs: ['gen-package-json', 'write-tsconfig', 'add-mf-config'], acceptanceCriteria: ['pnpm build exits 0'] },
    ],
  },
  {
    name: 'storybook-rollout',
    type: 'workflow',
    version: 1,
    description: 'Roll out Storybook + visual regression across Frame OS repositories',
    source: 'embedded',
    steps: [
      { id: 'add-deps', title: 'Add Storybook devDependencies', needs: [], acceptanceCriteria: ['@storybook/react installed'] },
      { id: 'write-config', title: 'Create .storybook/ config', needs: ['add-deps'], acceptanceCriteria: ['main.ts + preview.tsx'] },
      { id: 'write-stories', title: 'Write stories for all components', needs: ['write-config'], acceptanceCriteria: ['Every panel has a .stories.tsx'] },
      { id: 'verify-build', title: 'Run build-storybook', needs: ['write-stories'], acceptanceCriteria: ['Exits 0'] },
      { id: 'add-ci-gate', title: 'Add CI gate', needs: ['verify-build'], acceptanceCriteria: ['Storybook build in CI'] },
      { id: 'create-pr', title: 'Create PR', needs: ['add-ci-gate'], acceptanceCriteria: ['CI green'] },
      { id: 'visual-baseline', title: 'Generate visual regression baselines', needs: ['create-pr'], acceptanceCriteria: ['Snapshots committed'] },
    ],
  },
  {
    name: 'deploy-demo',
    type: 'workflow',
    version: 2,
    description: 'Deploy a Frame OS sub-app to Vercel with MF cache headers',
    source: 'embedded',
    steps: [
      { id: 'build', title: 'Build production artifacts', needs: [], acceptanceCriteria: ['Build exits 0', 'remoteEntry.js in dist/'] },
      { id: 'smoke-test', title: 'Run smoke tests', needs: ['build'], acceptanceCriteria: ['All tests pass'] },
      { id: 'verify-headers', title: 'Verify Vercel cache header rules', needs: ['build'], acceptanceCriteria: ['remoteEntry.js → no-store'] },
      { id: 'deploy', title: 'Deploy to Vercel', needs: ['smoke-test', 'verify-headers'], acceptanceCriteria: ['Preview URL accessible'] },
      { id: 'verify-shell', title: 'Verify shell loads MF remote', needs: ['deploy'], acceptanceCriteria: ['Dashboard loads', 'No duplicate Carbon'] },
    ],
  },
  {
    name: 'wasteland-patrol',
    type: 'patrol',
    version: 1,
    description: 'Scan Wasteland Dolt DB for stale items, validate stamps, report federation health',
    source: 'custom',
    steps: [
      { id: 'query-stale', title: 'Query wanted_items > 30 days', needs: [], acceptanceCriteria: ['Query completes in 5s'] },
      { id: 'close-expired', title: 'Auto-close expired bounties', needs: ['query-stale'], acceptanceCriteria: ['Status → archived'] },
      { id: 'validate-stamps', title: 'Check stamp FK integrity', needs: [], acceptanceCriteria: ['No orphaned stamps'] },
      { id: 'check-sync', title: 'Verify town sync freshness', needs: [], acceptanceCriteria: ['All towns synced < 24h'] },
      { id: 'report', title: 'Generate health report bead', needs: ['close-expired', 'validate-stamps', 'check-sync'], acceptanceCriteria: ['Patrol bead created'] },
    ],
  },
  {
    name: 'wasteland-join',
    type: 'expansion',
    version: 1,
    description: 'Join a Wasteland federation — fork Commons DB, register rig, sync Wanted Board',
    source: 'custom',
    steps: [
      { id: 'fork-commons', title: 'Fork Commons Dolt DB', needs: [], acceptanceCriteria: ['Fork on DoltHub'] },
      { id: 'clone-local', title: 'Clone to .wasteland/', needs: ['fork-commons'], acceptanceCriteria: ['Directory exists'] },
      { id: 'register-town', title: 'Register rig handle', needs: ['clone-local'], acceptanceCriteria: ['Row in towns table'] },
      { id: 'initial-sync', title: 'Pull latest Wanted Board', needs: ['register-town'], acceptanceCriteria: ['Items populated'] },
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

/** Full formula library — embedded workflows + custom patrols/expansions */
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
