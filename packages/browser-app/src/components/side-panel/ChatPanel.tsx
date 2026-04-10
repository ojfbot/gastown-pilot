import { useRef, useEffect, useCallback } from 'react'
import { TextArea, Button, InlineLoading, Tile } from '@carbon/react'
import { SendAlt, ChatBot } from '@carbon/icons-react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import {
  addMessage,
  setDraftInput,
  setIsLoading,
  setStreamingContent,
} from '../../store/chatSlice'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3018'

export function ChatPanel() {
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
      <div className="gt-chat-context-bar">
        <ChatBot size={14} />
        <span>Gas Town Agent</span>
      </div>

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
