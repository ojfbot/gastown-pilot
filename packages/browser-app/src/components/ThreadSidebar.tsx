import React, { useState } from 'react';

interface ThreadSidebarProps {
  shellMode?: boolean;
}

/**
 * Thread sidebar — inert wrapper with inert attribute pattern.
 * Uses {...(!isExpanded ? { inert: '' } : {})} on the wrapper div
 * to remove Carbon components from keyboard focus order when collapsed.
 */
export default function ThreadSidebar({ shellMode = false }: ThreadSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (shellMode) return null;

  return (
    <div
      className={`gastown-thread-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      {...(!isExpanded ? { inert: '' as any } : {})}
    >
      <button
        className="gastown-sidebar-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isExpanded ? 'Close' : 'Threads'}
      </button>
      {isExpanded && (
        <div className="gastown-sidebar-content">
          <p>Thread list placeholder</p>
        </div>
      )}
    </div>
  );
}
