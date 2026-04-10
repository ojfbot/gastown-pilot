import { IconButton } from '@carbon/react'
import { ChatBot, List } from '@carbon/icons-react'
import { SessionsPanel } from './side-panel/SessionsPanel'
import { ChatPanel } from './side-panel/ChatPanel'
import type { PanelTab } from '../store/threadsSlice'
import './GasTownSidePanel.css'

interface GasTownSidePanelProps {
  isExpanded: boolean
  onToggle: () => void
  activeTab: PanelTab
  onTabChange: (tab: PanelTab) => void
}

export default function GasTownSidePanel({ isExpanded, onToggle, activeTab, onTabChange }: GasTownSidePanelProps) {
  return (
    <div {...(!isExpanded ? { inert: '' as any } : {})}>
      <div
        className={`gt-side-panel${isExpanded ? ' expanded' : ''}`}
        data-element="gt-side-panel"
      >
        <div className="gt-panel-tabs">
          <button
            className={`gt-panel-tab${activeTab === 'sessions' ? ' active' : ''}`}
            onClick={() => onTabChange('sessions')}
          >
            <List size={16} />
            Sessions
          </button>
          <button
            className={`gt-panel-tab${activeTab === 'chat' ? ' active' : ''}`}
            onClick={() => onTabChange('chat')}
          >
            <ChatBot size={16} />
            Chat
          </button>
          <div className="gt-panel-tabs-spacer" />
          <IconButton
            label="Close panel"
            onClick={onToggle}
            size="sm"
            kind="ghost"
            className="gt-panel-close"
          >
            ×
          </IconButton>
        </div>

        {activeTab === 'sessions' ? (
          <SessionsPanel onTabChange={onTabChange} />
        ) : (
          <ChatPanel />
        )}
      </div>
    </div>
  )
}
