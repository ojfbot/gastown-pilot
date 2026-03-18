import React from 'react';
import { Tile, ProgressBar, Tag } from '@carbon/react';
import { useConvoys } from '../../hooks/useGasTown';

/** ConvoyTracker panel — active convoys with progress bars */
export default function ConvoyTracker() {
  const { data, isLoading } = useConvoys();
  const convoys = data?.convoys ?? [];

  return (
    <Tile className="gastown-panel gastown-convoy-tracker">
      <h4 className="gastown-panel-title">Convoys</h4>
      {isLoading ? (
        <p className="gastown-panel-loading">Connecting to data source...</p>
      ) : convoys.length === 0 ? (
        <p className="gastown-panel-empty">No active convoys</p>
      ) : (
        <ul className="gastown-convoy-list">
          {convoys.map((convoy: any) => (
            <li key={convoy.id} className="gastown-convoy-item">
              <div className="gastown-convoy-header">
                <span>{convoy.title}</span>
                <Tag size="sm">{convoy.done}/{convoy.total}</Tag>
              </div>
              <ProgressBar
                value={(convoy.done / convoy.total) * 100}
                label={`${convoy.done} of ${convoy.total} complete`}
                size="small"
              />
            </li>
          ))}
        </ul>
      )}
    </Tile>
  );
}
