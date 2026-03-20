import React from 'react';
import { Grid, Column, Tile, Tag } from '@carbon/react';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3018';

import { useQuery } from '@tanstack/react-query';
import type { RigHealth } from '@ojfbot/gastown-pilot-shared';
import { MOCK_RIGS } from '../../hooks/mockData';

function useRigs() {
  return useQuery({
    queryKey: ['gastown', 'rigs'],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE}/api/rigs`);
        if (!res.ok) return MOCK_RIGS;
        return await res.json() as { rigs: RigHealth[] };
      } catch {
        return MOCK_RIGS;
      }
    },
  });
}

const HEALTH_COLORS: Record<string, string> = {
  healthy: 'green',
  degraded: 'warm-gray',
  unhealthy: 'red',
};

/** RigsView — card grid of rigs with health indicators */
export default function RigsView() {
  const { data, isLoading } = useRigs();
  const rigs = data?.rigs ?? [];

  return (
    <div className="gastown-rigs-view">
      {isLoading ? (
        <Tile><p className="gastown-panel-loading">Connecting to data source...</p></Tile>
      ) : (
        <Grid narrow>
          {rigs.map((rig) => (
            <Column key={rig.name} lg={4} md={4} sm={4}>
              <Tile className="gastown-rig-card">
                <h4>{rig.name}</h4>
                <Tag size="sm" type={HEALTH_COLORS[rig.health] as any}>
                  {rig.health.toUpperCase()}
                </Tag>
                <div className="gastown-rig-stats">
                  <span>{rig.agentCount} agents</span>
                  <span>{rig.activeConvoys} convoys</span>
                  <span>{rig.mergeQueueDepth} in merge queue</span>
                </div>
              </Tile>
            </Column>
          ))}
        </Grid>
      )}
    </div>
  );
}
