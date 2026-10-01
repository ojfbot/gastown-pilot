/**
 * Gas Town API base URL. Loopback only in dev — a production bundle must never
 * reach for localhost (it triggers the browser's Local Network Access prompt
 * for every visitor). Empty means "no API configured": hooks serve mock data.
 */
export const API_BASE: string =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:3018' : '');

/** Fetch JSON, falling back to mock data on any failure or when no API is configured */
export async function fetchOrMock<T>(path: string, fallback: T): Promise<T> {
  if (!API_BASE) return fallback;
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}
