import type { Meta, StoryObj } from '@storybook/react'
import ProblemsView from './ProblemsView'

const meta: Meta<typeof ProblemsView> = {
  title: 'Panels/ProblemsView',
  component: ProblemsView,
}

export default meta
type Story = StoryObj<typeof ProblemsView>

/** Default state — no problems detected */
export const Default: Story = {}

/** Empty state is the same since the component has no props — problems are hardcoded empty */
export const NoProblems: Story = {}
