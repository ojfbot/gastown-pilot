import React from 'react';
import { Tile, Button } from '@carbon/react';

/**
 * ProblemsView panel — surfaces stalled/error agents with action buttons.
 * Actions: Nudge, Handoff, Escalate (all call POST /api/commands).
 */
export default function ProblemsView() {
  // SCAFFOLD: stub — no stalled agents in stub data
  const problems: Array<{ agentId: string; name: string; rig: string; stallDuration: string }> = [];

  return (
    <Tile className="gastown-panel gastown-problems-view">
      <h4 className="gastown-panel-title">Problems</h4>
      {problems.length === 0 ? (
        <p className="gastown-panel-empty">No problems detected</p>
      ) : (
        <ul className="gastown-problem-list">
          {problems.map((p) => (
            <li key={p.agentId} className="gastown-problem-item">
              <div>
                <strong>{p.name}</strong> ({p.rig}) — stalled {p.stallDuration}
              </div>
              <div className="gastown-problem-actions">
                <Button size="sm" kind="ghost">Nudge</Button>
                <Button size="sm" kind="ghost">Handoff</Button>
                <Button size="sm" kind="danger--ghost">Escalate</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Tile>
  );
}
