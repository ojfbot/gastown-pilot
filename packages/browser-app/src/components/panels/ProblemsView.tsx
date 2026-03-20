import React from 'react';
import { Tile, Button, Tag } from '@carbon/react';
import { useAgents } from '../../hooks/useGasTown';

export interface AgentProblem {
  agentId: string;
  name: string;
  rig: string;
  status: 'stalled' | 'error' | 'dead';
  task: string;
  stallDuration?: string;
  stalledSince?: string;
}

/**
 * ProblemsView panel — surfaces stalled/error agents with action buttons.
 * Actions: Nudge, Handoff, Escalate (all call POST /api/commands).
 */
export default function ProblemsView() {
  const { data } = useAgents();
  const agents = data?.agents ?? [];
  const problems: AgentProblem[] = agents
    .filter((a: any) => a.status === 'stalled' || a.status === 'error' || a.status === 'dead')
    .map((a: any) => ({
      agentId: a.id,
      name: a.name,
      rig: a.rig,
      status: a.status,
      task: a.task ?? '',
      stallDuration: a.stallDuration,
      stalledSince: a.stalledSince,
    }));

  const STATUS_TAGS: Record<string, string> = {
    stalled: 'warm-gray',
    error: 'red',
    dead: 'red',
  };

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
                <Tag size="sm" type={STATUS_TAGS[p.status] as any}>{p.status.toUpperCase()}</Tag>
                {' '}<strong>{p.name}</strong> ({p.rig})
                {p.stallDuration && ` — stalled ${p.stallDuration}`}
              </div>
              {p.task && <div className="gastown-problem-task">{p.task}</div>}
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
