import React from 'react';
import { Tile, ProgressBar, Tag } from '@carbon/react';
import { useConvoys } from '../../hooks/useGasTown';
import type { ConvoyProgress } from '@ojfbot/gastown-pilot-shared';

const STATUS_TAG_TYPE: Record<string, 'green' | 'red' | 'blue' | 'gray' | 'purple'> = {
  completed: 'green',
  failed: 'red',
  active: 'blue',
  forming: 'gray',
  stalled: 'purple',
};

/** ConvoyTracker panel — active convoys with progress bars */
export default function ConvoyTracker() {
  const { data, isLoading } = useConvoys();
  const convoys: ConvoyProgress[] = data?.convoys ?? [];

  return (
    <Tile className="gastown-panel gastown-convoy-tracker">
      <h4 className="gastown-panel-title">Convoys</h4>
      {isLoading ? (
        <p className="gastown-panel-loading">Connecting to data source...</p>
      ) : convoys.length === 0 ? (
        <p className="gastown-panel-empty">No active convoys</p>
      ) : (
        <ul className="gastown-convoy-list">
          {convoys.map((convoy) => (
            <li key={convoy.id} className="gastown-convoy-item">
              <div className="gastown-convoy-header">
                <span>{convoy.title}</span>
                <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                  <Tag size="sm" type={STATUS_TAG_TYPE[convoy.status] ?? 'gray'}>
                    {convoy.status}
                  </Tag>
                  <Tag size="sm">{convoy.done}/{convoy.total}</Tag>
                  {convoy.active > 0 && (
                    <Tag size="sm" type="blue">{convoy.active} running</Tag>
                  )}
                </div>
              </div>
              <ProgressBar
                value={convoy.total > 0 ? (convoy.done / convoy.total) * 100 : 0}
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
