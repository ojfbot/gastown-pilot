import { useState } from 'react';
import { ChatShell, ChatMessage } from '@ojfbot/frame-ui-components';
import '@ojfbot/frame-ui-components/styles/chat-shell';
import type { ChatDisplayState } from '@ojfbot/frame-ui-components';

interface CondensedChatProps {
  sidebarExpanded?: boolean;
}

/**
 * Gas Town chat — wraps the shared ChatShell.
 * Currently a placeholder; will connect to the Gas Town agent API.
 */
export default function CondensedChat({ sidebarExpanded = false }: CondensedChatProps) {
  const [displayState, setDisplayState] = useState<ChatDisplayState>('collapsed');
  const [draftInput, setDraftInput] = useState('');

  const handleSend = (message: string) => {
    // TODO: connect to Gas Town agent API
    setDraftInput('');
  };

  return (
    <ChatShell
      displayState={displayState}
      onDisplayStateChange={setDisplayState}
      sidebarExpanded={sidebarExpanded}
      title="Gas Town Agent"
      draftInput={draftInput}
      onDraftChange={setDraftInput}
      onSend={handleSend}
      placeholder="Ask the Gas Town agent..."
    >
      <ChatMessage role="assistant">
        Gas Town agent is ready. Ask me about convoys, agents, or formulas.
      </ChatMessage>
    </ChatShell>
  );
}
