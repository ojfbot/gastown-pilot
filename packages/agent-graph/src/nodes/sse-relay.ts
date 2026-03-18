import type { GasTownPilotState } from '../state/schema.js';

/**
 * SSE relay node — connects to gt dashboard SSE stream and processes events.
 *
 * In production: connects to http://localhost:${GT_DASHBOARD_PORT} SSE stream,
 * parses agent state changes, bead events, convoy progress, merge queue updates.
 *
 * SCAFFOLD: stub — returns empty state.
 */
export async function sseRelayNode(
  state: GasTownPilotState,
): Promise<Partial<GasTownPilotState>> {
  // SCAFFOLD: stub — no SSE connection
  return { error: null };
}
