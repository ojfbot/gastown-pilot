import { useState, useRef, useEffect, useCallback } from 'react'
import { TextArea, Button, IconButton, InlineLoading, Tile } from '@carbon/react'
import { SendAlt, Add, TrashCan, ChatBot, List } from '@carbon/icons-react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { addThread, switchThread, removeThread, renameThread } from '../store/threadsSlice'
import {
  addMessage,
  setDraftInput,
  setIsLoading,
  setStreamingContent,
} from '../store/chatSlice'
import type { PanelTab } from '../store/threadsSlice'
import './GasTownSidePanel.css'

interface GasTownSidePanelProps {
  isExpanded: boolean
  onToggle: () => void
  activeTab: PanelTab
  onTabChange: (tab: PanelTab) => void
}

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3018'

// ── Sessions panel ────────────────────────────────────────────────────────────

function SessionsPanel({ onTabChange }: { onTabChange: (tab: PanelTab) => void }) {
  const dispatch = useAppDispatch()
  const threads = useAppSelector(s => s.threads.threads)
  const activeThreadId = useAppSelector(s => s.threads.activeThreadId)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleAdd = () => {
    dispatch(addThread(`Session ${threads.length + 1}`))
  }

  const handleSwitch = (id: string) => {
    if (id === activeThreadId) { onTabChange('chat'); return }
    dispatch(switchThread(id))
    onTabChange('chat')
  }

  const handleRenameCommit = (id: string) => {
    if (editValue.trim()) dispatch(renameThread({ id, name: editValue.trim() }))
    setEditingId(null)
    setEditValue('')
  }

  return (
    <div className="gt-panel-body">
      <div className="gt-panel-section-header">
        <span>Gas Town sessions</span>
        <button className="gt-panel-icon-btn gt-panel-icon-btn--primary" onClick={handleAdd} title="New session">
          <Add size={16} />
        </button>
      </div>

      <ul className="gt-sessions-list">
        {threads.map(thread => (
          <li
            key={thread.id}
            className={`gt-session-item${thread.id === activeThreadId ? ' active' : ''}`}
          >
            {editingId === thread.id ? (
              <input
                className="gt-session-rename-input"
                value={editValue}
                autoFocus
                onChange={e => setEditValue(e.target.value)}
                onBlur={() => handleRenameCommit(thread.id)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleRenameCommit(thread.id)
                  if (e.key === 'Escape') { setEditingId(null); setEditValue('') }
                  e.stopPropagation()
                }}
                onClick={e => e.stopPropagation()}
              />
            ) : (
              <div className="gt-session-item-content" onClick={() => handleSwitch(thread.id)}>
                <span
                  className="gt-session-item-name"
                  onDoubleClick={e => {
                    e.stopPropagation()
                    setEditingId(thread.id)
                    setEditValue(thread.name)
                  }}
                >
                  {thread.name}
                </span>
                <span className="gt-session-item-date">
                  {new Date(thread.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
            {threads.length > 1 && editingId !== thread.id && (
              <button
                className="gt-session-item-delete"
                onClick={e => { e.stopPropagation(); dispatch(removeThread(thread.id)) }}
                title="Remove session"
              >
                <TrashCan size={14} />
              </button>
            )}
          </li>
        ))}
      </ul>

      <p className="gt-panel-hint">Double-click a session name to rename it.</p>
    </div>
  )
}

// ── Chat panel ────────────────────────────────────────────────────────────────

function ChatPanel() {
  const dispatch = useAppDispatch()
  const messages = useAppSelector(s => s.chat.messages)
  const draftInput = useAppSelector(s => s.chat.draftInput)
  const isLoading = useAppSelector(s => s.chat.isLoading)
  const streamingContent = useAppSelector(s => s.chat.streamingContent)
  const activeThreadId = useAppSelector(s => s.threads.activeThreadId)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingContent])

  const handleSend = useCallback(async (text?: string) => {
    const userText = (text ?? draftInput).trim()
    if (!userText || isLoading) return

    dispatch(addMessage({ role: 'user', content: userText }))
    dispatch(setDraftInput(''))
    dispatch(setIsLoading(true))
    dispatch(setStreamingContent(''))

    const history = messages.slice(-10).map(m => ({ role: m.role, content: m.content }))

    try {
      const res = await fetch(`${API_BASE}/api/commands`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cmd: userText,
          threadId: activeThreadId,
          conversationHistory: history,
        }),
      })
      if (!res.ok) throw new Error(`API error ${res.status}`)
      const data = await res.json() as { output?: string; error?: string }
      dispatch(addMessage({
        role: 'assistant',
        content: data.output ?? data.error ?? 'Command executed.',
      }))
    } catch (err) {
      dispatch(addMessage({
        role: 'assistant',
        content: `Error: ${err instanceof Error ? err.message : 'Could not reach API.'}`,
      }))
    } finally {
      dispatch(setIsLoading(false))
    }
  }, [draftInput, isLoading, messages, activeThreadId, dispatch])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }, [handleSend])

  return (
    <div className="gt-chat-panel">
      {/* Context indicator */}
      <div className="gt-chat-context-bar">
        <ChatBot size={14} />
        <span>Gas Town Agent</span>
      </div>

      {/* Messages */}
      <div className="gt-chat-messages">
        {messages.length === 0 && !isLoading && (
          <div className="gt-chat-empty">
            Run gt commands or ask about agents, convoys, beads, and formulas.
          </div>
        )}
        {messages.map((msg, idx) => (
          <Tile key={idx} className={`gt-msg-tile ${msg.role}`}>
            <div className="gt-msg-header">
              <strong>{msg.role === 'user' ? 'You' : 'Gas Town'}</strong>
            </div>
            <div className="gt-msg-content">{msg.content}</div>
          </Tile>
        ))}
        {streamingContent && (
          <Tile className="gt-msg-tile assistant streaming">
            <div className="gt-msg-header">
              <strong>Gas Town</strong>
              <span className="gt-msg-streaming">Typing…</span>
            </div>
            <div className="gt-msg-content">{streamingContent}</div>
          </Tile>
        )}
        {isLoading && !streamingContent && (
          <Tile className="gt-msg-tile assistant">
            <InlineLoading description="Thinking…" />
          </Tile>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="gt-chat-input-area">
        <TextArea
          ref={textAreaRef}
          labelText=""
          placeholder="Run a gt command or ask a question…"
          value={draftInput}
          onChange={e => dispatch(setDraftInput(e.target.value))}
          onKeyDown={handleKeyDown}
          rows={3}
          className="gt-chat-textarea"
        />
        <div className="gt-chat-send-row">
          <Button
            renderIcon={SendAlt}
            onClick={() => handleSend()}
            disabled={!draftInput.trim() || isLoading}
            size="sm"
            kind="primary"
            hasIconOnly
            iconDescription="Send"
          />
        </div>
      </div>
    </div>
  )
}

// ── Side panel shell ──────────────────────────────────────────────────────────

export default function GasTownSidePanel({ isExpanded, onToggle, activeTab, onTabChange }: GasTownSidePanelProps) {
  return (
    <div {...(!isExpanded ? { inert: '' as any } : {})}>
      <div
        className={`gt-side-panel${isExpanded ? ' expanded' : ''}`}
        data-element="gt-side-panel"
      >
        {/* Tab bar */}
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

        {/* Panel content */}
        {activeTab === 'sessions' ? (
          <SessionsPanel onTabChange={onTabChange} />
        ) : (
          <ChatPanel />
        )}
      </div>
    </div>
  )
}
