import type { Meta, StoryObj } from '@storybook/react'
import CondensedChat from './CondensedChat'

const meta: Meta<typeof CondensedChat> = {
  title: 'Components/CondensedChat',
  component: CondensedChat,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof CondensedChat>

/** Default — sidebar collapsed, chat trigger visible at bottom-right */
export const Default: Story = {
  args: {
    sidebarExpanded: false,
  },
}

/** Sidebar expanded — chat button shifts left to clear the sidebar rail */
export const WithSidebarExpanded: Story = {
  args: {
    sidebarExpanded: true,
  },
}
