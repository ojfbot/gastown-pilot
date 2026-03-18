import React from 'react';
import { Tile } from '@carbon/react';
import ConvoyTracker from './ConvoyTracker';

/** ConvoysView — full convoy management (expanded view of ConvoyTracker) */
export default function ConvoysView() {
  return (
    <div className="gastown-convoys-view">
      <ConvoyTracker />
      <Tile className="gastown-panel">
        <h4 className="gastown-panel-title">Convoy Management</h4>
        <p className="gastown-panel-empty">
          Full convoy management table — create, expand, assign beads.
          Stub: wire to POST /api/commands for convoy create.
        </p>
      </Tile>
    </div>
  );
}
