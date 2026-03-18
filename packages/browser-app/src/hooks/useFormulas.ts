import { useQuery } from '@tanstack/react-query';
import type { FormulaDefinition } from '@ojfbot/gastown-pilot-shared';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3018';

/** Formula library — React Query (no SSE, formulas are static) */
export function useFormulas() {
  return useQuery({
    queryKey: ['gastown', 'formulas'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/formulas`);
      return res.json() as Promise<{ formulas: FormulaDefinition[] }>;
    },
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
