import React, { useState } from 'react';
import { Tile, Search, Tag } from '@carbon/react';
import { useBeads } from '../../hooks/useBeads';

/** BeadsView — master-detail bead explorer */
export default function BeadsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading } = useBeads();
  const beads = data?.beads ?? [];

  return (
    <div className="gastown-beads-view">
      <div className="gastown-beads-master">
        <Tile className="gastown-panel">
          <h4 className="gastown-panel-title">Bead Explorer</h4>
          <Search
            size="sm"
            labelText="Search beads"
            placeholder="Search by prefix, title, label..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
          />
          {isLoading ? (
            <p className="gastown-panel-loading">Connecting to data source...</p>
          ) : beads.length === 0 ? (
            <p className="gastown-panel-empty">No beads found — BeadStore empty or not connected</p>
          ) : (
            <ul className="gastown-bead-list">
              {beads.map((bead: any) => (
                <li key={bead.id} className="gastown-bead-item">
                  <Tag size="sm">{bead.type}</Tag>
                  <span>{bead.title}</span>
                </li>
              ))}
            </ul>
          )}
        </Tile>
      </div>
      <div className="gastown-beads-detail">
        <Tile className="gastown-panel">
          <p className="gastown-panel-empty">Select a bead to view details</p>
        </Tile>
      </div>
    </div>
  );
}
