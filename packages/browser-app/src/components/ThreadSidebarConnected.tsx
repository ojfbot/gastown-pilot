import { ThreadSidebar } from '@ojfbot/frame-ui-components'
import '@ojfbot/frame-ui-components/styles/thread-sidebar'
import type { ThreadItem } from '@ojfbot/frame-ui-components'
import { useAppDispatch, useAppSelector } from '../store/store'
import { addThread, switchThread, removeThread } from '../store/threadsSlice'

interface ThreadSidebarConnectedProps {
  isExpanded: boolean
  onToggle: () => void
}

export default function ThreadSidebarConnected({ isExpanded, onToggle }: ThreadSidebarConnectedProps) {
  const dispatch = useAppDispatch()
  const threads = useAppSelector(s => s.threads.threads)
  const activeThreadId = useAppSelector(s => s.threads.activeThreadId)

  const threadItems: ThreadItem[] = threads.map(t => ({
    threadId: t.id,
    title: t.name,
    updatedAt: t.createdAt,
  }))

  return (
    <ThreadSidebar
      isExpanded={isExpanded}
      onToggle={onToggle}
      threads={threadItems}
      currentThreadId={activeThreadId}
      title="Gas Town Sessions"
      onCreateThread={() => {
        const timestamp = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
        dispatch(addThread(`Session - ${timestamp}`))
      }}
      onSelectThread={(threadId) => {
        if (activeThreadId !== threadId) dispatch(switchThread(threadId))
      }}
      onDeleteThread={(threadId) => dispatch(removeThread(threadId))}
    />
  )
}
