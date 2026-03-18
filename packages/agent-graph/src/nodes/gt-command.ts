import type { GasTownPilotState } from '../state/schema.js';
import type { GtCommandResult } from '@ojfbot/gastown-pilot-shared';

/**
 * gt CLI command node — proxies commands to the gt CLI.
 * Supports: sling, nudge, handoff, convoy create, bead create/close.
 *
 * SCAFFOLD: stub — returns stubbed results.
 */
export async function gtCommandNode(
  state: GasTownPilotState,
): Promise<Partial<GasTownPilotState>> {
  // SCAFFOLD: stub — return mock command result
  const result: GtCommandResult = {
    success: true,
    output: 'stubbed: gt command',
    command: 'gt stub',
  };
  return { lastCommand: result, error: null };
}
