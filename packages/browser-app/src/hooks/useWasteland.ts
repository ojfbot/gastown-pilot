import { useQuery } from '@tanstack/react-query';
import type { WastelandWantedItem, CharacterSheet, Stamp } from '@ojfbot/gastown-pilot-shared';
import { MOCK_WASTELAND_WANTED, MOCK_CHARACTER_SHEET, MOCK_LEADERBOARD } from './mockData';

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

/** Wasteland wanted board — manual refresh via sync button */
export function useWastelandWanted(status?: string) {
  const params = new URLSearchParams();
  if (status) params.set('status', status);

  return useQuery({
    queryKey: ['wasteland', 'wanted', status],
    queryFn: () => fetchOrMock(`${API_BASE}/api/wasteland/wanted?${params}`, MOCK_WASTELAND_WANTED),
  });
}

/** Character sheet */
export function useCharacterSheet(handle: string) {
  return useQuery({
    queryKey: ['wasteland', 'sheet', handle],
    queryFn: () => fetchOrMock(`${API_BASE}/api/wasteland/sheet/${handle}`, MOCK_CHARACTER_SHEET as CharacterSheet),
    enabled: !!handle,
  });
}

/** Stamp history */
export function useStamps(handle: string) {
  return useQuery({
    queryKey: ['wasteland', 'stamps', handle],
    queryFn: () => fetchOrMock(`${API_BASE}/api/wasteland/stamps/${handle}`, { stamps: [] as Stamp[] }),
    enabled: !!handle,
  });
}

/** Leaderboard */
export function useLeaderboard() {
  return useQuery({
    queryKey: ['wasteland', 'leaderboard'],
    queryFn: () => fetchOrMock(`${API_BASE}/api/wasteland/leaderboard`, MOCK_LEADERBOARD),
  });
}
