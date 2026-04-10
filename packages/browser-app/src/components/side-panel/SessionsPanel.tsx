import { useState } from 'react'
import { Add, TrashCan } from '@carbon/icons-react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { addThread, switchThread, removeThread, renameThread } from '../../store/threadsSlice'
import type { PanelTab } from '../../store/threadsSlice'

interface SessionsPanelProps {
  onTabChange: (tab: PanelTab) => void
}

export function SessionsPanel({ onTabChange }: SessionsPanelProps) {
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
