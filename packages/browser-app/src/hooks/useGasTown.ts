import { useQuery } from '@tanstack/react-query';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3018';

/** SSE relay events — push via WebSocket (stubbed as polling) */
export function useGasTown() {
  return useQuery({
    queryKey: ['gastown', 'events'],
    queryFn: async () => {
      // SCAFFOLD: stub — returns empty event list
      // TODO: wire to WebSocket SSE relay
      return { events: [] as Array<{ type: string; timestamp: string; summary: string }> };
    },
    refetchInterval: 5000,
  });
}

/** Agent tree — push via WebSocket (stubbed as polling) */
export function useAgents() {
  return useQuery({
    queryKey: ['gastown', 'agents'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/agents`);
      return res.json() as Promise<{ agents: Array<{ id: string; name: string; rig: string; status: string; task: string }> }>;
    },
    refetchInterval: 5000,
  });
}

/** Convoy list — push via WebSocket (stubbed as polling) */
export function useConvoys() {
  return useQuery({
    queryKey: ['gastown', 'convoys'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/convoys`);
      return res.json();
    },
    refetchInterval: 5000,
  });
}
