import { useQuery } from '@tanstack/react-query';
import { MOCK_AGENTS, MOCK_CONVOYS, MOCK_EVENTS } from './mockData';

import { fetchOrMock } from './api';

/** SSE relay events — push via WebSocket (stubbed as polling) */
export function useGasTown() {
  return useQuery({
    queryKey: ['gastown', 'events'],
    queryFn: () => fetchOrMock('/api/events', MOCK_EVENTS),
    refetchInterval: 5000,
  });
}

/** Agent tree — push via WebSocket (stubbed as polling) */
export function useAgents() {
  return useQuery({
    queryKey: ['gastown', 'agents'],
    queryFn: () => fetchOrMock('/api/agents', MOCK_AGENTS),
    refetchInterval: 5000,
  });
}

/** Convoy list — push via WebSocket (stubbed as polling) */
export function useConvoys() {
  return useQuery({
    queryKey: ['gastown', 'convoys'],
    queryFn: () => fetchOrMock('/api/convoys', MOCK_CONVOYS),
    refetchInterval: 5000,
  });
}
