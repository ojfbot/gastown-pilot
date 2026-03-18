import React from 'react';
import { Tile, Tag, TreeView, TreeNode } from '@carbon/react';
import { useAgents } from '../../hooks/useGasTown';

const STATUS_COLORS: Record<string, string> = {
  active: 'green',
  idle: 'gray',
  stalled: 'warm-gray',
  error: 'red',
  dead: 'red',
};

/**
 * AgentTree panel — Carbon TreeView with agents grouped by rig.
 * Click agent → slide-over with full detail (hook, mail count, session ID).
 */
export default function AgentTree() {
  const { data, isLoading } = useAgents();
  const agents = data?.agents ?? [];

  // Group agents by rig
  const byRig = agents.reduce<Record<string, typeof agents>>((acc, agent) => {
    (acc[agent.rig] ??= []).push(agent);
    return acc;
  }, {});

  return (
    <Tile className="gastown-panel gastown-agent-tree">
      <h4 className="gastown-panel-title">Agent Tree</h4>
      {isLoading ? (
        <p className="gastown-panel-loading">Connecting to data source...</p>
      ) : agents.length === 0 ? (
        <p className="gastown-panel-empty">No agents registered</p>
      ) : (
        <TreeView label="Agents">
          {Object.entries(byRig).map(([rig, rigAgents]) => (
            <TreeNode key={rig} id={rig} label={rig}>
              {rigAgents.map((agent) => (
                <TreeNode
                  key={agent.id}
                  id={agent.id}
                  label={
                    <span className="gastown-agent-node">
                      <Tag size="sm" type={STATUS_COLORS[agent.status] as any}>
                        {agent.status.toUpperCase()}
                      </Tag>
                      {' '}{agent.name}
                      {agent.task && <span className="gastown-agent-task"> — {agent.task.slice(0, 40)}</span>}
                    </span>
                  }
                />
              ))}
            </TreeNode>
          ))}
        </TreeView>
      )}
    </Tile>
  );
}
