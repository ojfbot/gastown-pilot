import type { GasTownPilotState } from '../state/schema.js';

/**
 * Prime node — first live consumer of Gas Town A3 pattern.
 *
 * In production, this calls runPrimeNode from @core/workflows to check:
 * 1. Is there work on the hook? → route to bead_query
 * 2. Is there unread mail? → route to bead_query
 * 3. Is budget exhausted? → route to budget_exhausted
 * 4. Is approval pending? → route to await_approval
 * 5. Otherwise → route to await_input
 *
 * SCAFFOLD: Currently stubbed — routes to await_input.
 * Wire to actual runPrimeNode when @core/workflows is added as dependency.
 */
export async function primeNode(
  state: GasTownPilotState,
): Promise<Partial<GasTownPilotState>> {
  // SCAFFOLD: stub — always routes to await_input
  // TODO: import { runPrimeNode } from '@core/workflows' and call it here
  return { route: 'await_input' };
}
