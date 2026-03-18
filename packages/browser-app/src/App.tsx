import React from 'react';
import Dashboard from './components/Dashboard';

/**
 * Standalone app wrapper for dev mode.
 * In shell mode, Dashboard is loaded directly via Module Federation.
 */
export default function App() {
  return (
    <div>
      <header className="gastown-standalone-header">
        Gas Town Pilot — Standalone Dev Mode
      </header>
      <div className="gastown-standalone-layout">
        <div className="gastown-standalone-main">
          <Dashboard shellMode={false} />
        </div>
      </div>
    </div>
  );
}
