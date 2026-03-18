import { useQuery } from '@tanstack/react-query';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3018';

interface BeadFilter {
  type?: string;
  status?: string;
  prefix?: string;
}

/** Bead query — React Query + SSE invalidation */
export function useBeads(filter: BeadFilter = {}) {
  const params = new URLSearchParams();
  if (filter.type) params.set('type', filter.type);
  if (filter.status) params.set('status', filter.status);
  if (filter.prefix) params.set('prefix', filter.prefix);

  return useQuery({
    queryKey: ['gastown', 'beads', filter],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/beads?${params}`);
      return res.json() as Promise<{ beads: unknown[] }>;
    },
  });
}
