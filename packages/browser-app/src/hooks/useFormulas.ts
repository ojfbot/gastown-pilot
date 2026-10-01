import { useQuery } from '@tanstack/react-query';
import type { FormulaDefinition } from '@ojfbot/gastown-pilot-shared';
import { MOCK_FORMULAS } from './mockData';

import { fetchOrMock } from './api';

/** Formula library — React Query (no SSE, formulas are static) */
export function useFormulas() {
  return useQuery({
    queryKey: ['gastown', 'formulas'],
    queryFn: () => fetchOrMock<{ formulas: FormulaDefinition[] }>('/api/formulas', MOCK_FORMULAS),
    staleTime: 60_000,
  });
}

/** Single molecule state — React Query + SSE invalidation */
export function useMolecule(id: string | null) {
  return useQuery({
    queryKey: ['gastown', 'molecule', id],
    queryFn: async () => {
      // SCAFFOLD: stub — no molecule endpoint yet
      return null;
    },
    enabled: !!id,
  });
}
