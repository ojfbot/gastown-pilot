import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import threadsReducer from '../store/threadsSlice'
import chatReducer from '../store/chatSlice'
import GasTownSidePanel from './GasTownSidePanel'

const makeStore = () =>
  configureStore({
    reducer: {
      threads: threadsReducer,
      chat: chatReducer,
    },
  })

const makeClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })

const meta: Meta<typeof GasTownSidePanel> = {
  title: 'Components/GasTownSidePanel',
  component: GasTownSidePanel,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Provider store={makeStore()}>
        <QueryClientProvider client={makeClient()}>
          <div style={{ minHeight: '600px', position: 'relative' }}>
            <Story />
          </div>
        </QueryClientProvider>
      </Provider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof GasTownSidePanel>

/** Expanded — sessions tab active */
export const ExpandedSessions: Story = {
  args: {
    isExpanded: true,
    onToggle: () => {},
    activeTab: 'sessions',
    onTabChange: () => {},
  },
}

/** Expanded — chat tab active */
export const ExpandedChat: Story = {
  args: {
    isExpanded: true,
    onToggle: () => {},
    activeTab: 'chat',
    onTabChange: () => {},
  },
}

/** Collapsed — panel hidden via inert attribute */
export const Collapsed: Story = {
  args: {
    isExpanded: false,
    onToggle: () => {},
    activeTab: 'sessions',
    onTabChange: () => {},
  },
}
