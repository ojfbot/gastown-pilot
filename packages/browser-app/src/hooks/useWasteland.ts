import { useQuery } from '@tanstack/react-query';
import type { WastelandWantedItem, CharacterSheet, Stamp } from '@ojfbot/gastown-pilot-shared';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3018';

/** Wasteland wanted board — manual refresh via sync button */
export function useWastelandWanted(status?: string) {
  const params = new URLSearchParams();
  if (status) params.set('status', status);

  return useQuery({
    queryKey: ['wasteland', 'wanted', status],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/wasteland/wanted?${params}`);
      return res.json() as Promise<{ items: WastelandWantedItem[] }>;
    },
  });
}

/** Character sheet */
export function useCharacterSheet(handle: string) {
  return useQuery({
    queryKey: ['wasteland', 'sheet', handle],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/wasteland/sheet/${handle}`);
      return res.json() as Promise<CharacterSheet>;
    },
    enabled: !!handle,
  });
}

/** Stamp history */
export function useStamps(handle: string) {
  return useQuery({
    queryKey: ['wasteland', 'stamps', handle],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/wasteland/stamps/${handle}`);
      return res.json() as Promise<{ stamps: Stamp[] }>;
    },
    enabled: !!handle,
  });
}

/** Leaderboard */
export function useLeaderboard() {
  return useQuery({
    queryKey: ['wasteland', 'leaderboard'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/wasteland/leaderboard`);
      return res.json();
    },
  });
}
