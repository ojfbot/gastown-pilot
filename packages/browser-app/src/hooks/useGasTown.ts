import { useQuery } from '@tanstack/react-query';
import { MOCK_AGENTS, MOCK_CONVOYS, MOCK_EVENTS } from './mockData';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3018';

async function fetchOrMock<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

/** SSE relay events — push via WebSocket (stubbed as polling) */
export function useGasTown() {
  return useQuery({
    queryKey: ['gastown', 'events'],
    queryFn: () => fetchOrMock(`${API_BASE}/api/events`, MOCK_EVENTS),
    refetchInterval: 5000,
  });
}

/** Agent tree — push via WebSocket (stubbed as polling) */
export function useAgents() {
  return useQuery({
    queryKey: ['gastown', 'agents'],
    queryFn: () => fetchOrMock(`${API_BASE}/api/agents`, MOCK_AGENTS),
    refetchInterval: 5000,
  });
}

/** Convoy list — push via WebSocket (stubbed as polling) */
export function useConvoys() {
  return useQuery({
    queryKey: ['gastown', 'convoys'],
    queryFn: () => fetchOrMock(`${API_BASE}/api/convoys`, MOCK_CONVOYS),
    refetchInterval: 5000,
  });
}
