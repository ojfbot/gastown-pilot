import { useQuery } from '@tanstack/react-query';
import { MOCK_BEADS } from './mockData';

import { fetchOrMock } from './api';

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
    queryFn: () => fetchOrMock<{ beads: unknown[] }>(`/api/beads?${params}`, MOCK_BEADS),
  });
}
