import React from 'react';
import { Tile, Tag } from '@carbon/react';
import { useGasTown } from '../../hooks/useGasTown';

/** EventStream panel — chronological feed of Gas Town events */
export default function EventStream() {
  const { data, isLoading } = useGasTown();
  const events = data?.events ?? [];

  return (
    <Tile className="gastown-panel gastown-event-stream">
      <h4 className="gastown-panel-title">Event Stream</h4>
      {isLoading ? (
        <p className="gastown-panel-loading">Connecting to data source...</p>
      ) : events.length === 0 ? (
        <p className="gastown-panel-empty">No events yet — waiting for SSE relay connection</p>
      ) : (
        <ul className="gastown-event-list">
          {events.map((event, i) => (
            <li key={i} className="gastown-event-item">
              <Tag size="sm">{event.type}</Tag>
              <span className="gastown-event-summary">{event.summary}</span>
              <span className="gastown-event-time">{event.timestamp}</span>
            </li>
          ))}
        </ul>
      )}
    </Tile>
  );
}
