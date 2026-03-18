import React, { useState } from 'react';

interface CondensedChatProps {
  sidebarExpanded?: boolean;
}

/**
 * Condensed chat overlay — position:fixed, bottom-right.
 * Sidebar-aware right offset matches cv-builder/blogengine convention.
 */
export default function CondensedChat({ sidebarExpanded = false }: CondensedChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  const rightOffset = sidebarExpanded ? '320px' : '1rem';

  return (
    <div
      className="gastown-condensed-chat"
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: rightOffset,
        zIndex: 100,
      }}
    >
      {isOpen ? (
        <div className="gastown-chat-panel">
          <div className="gastown-chat-header">
            <span>Gas Town Agent</span>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">x</button>
          </div>
          <div className="gastown-chat-messages">
            <p>Chat placeholder</p>
          </div>
        </div>
      ) : (
        <button
          className="gastown-chat-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open Gas Town chat"
        >
          Chat
        </button>
      )}
    </div>
  );
}
