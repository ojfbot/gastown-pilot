import { StateGraph, END } from '@langchain/langgraph';
import { GasTownPilotStateAnnotation } from './state/schema.js';
import { primeNode } from './nodes/prime.js';
import { beadQueryNode } from './nodes/bead-query.js';
import { gtCommandNode } from './nodes/gt-command.js';
import { sseRelayNode } from './nodes/sse-relay.js';

/**
 * GasTownPilot agent graph.
 *
 * Entry: prime → route decision
 * Routes: bead_query | gt_command | sse_relay | await_input | budget_exhausted | await_approval
 */
function routeFromPrime(state: { route: string }): string {
  return state.route;
}

const graph = new StateGraph(GasTownPilotStateAnnotation)
  .addNode('prime', primeNode)
  .addNode('bead_query', beadQueryNode)
  .addNode('gt_command', gtCommandNode)
  .addNode('sse_relay', sseRelayNode)
  .addEdge('__start__', 'prime')
  .addConditionalEdges('prime', routeFromPrime, {
    bead_query: 'bead_query',
    gt_command: 'gt_command',
    sse_relay: 'sse_relay',
    await_input: END,
    budget_exhausted: END,
    await_approval: END,
  })
  .addEdge('bead_query', END)
  .addEdge('gt_command', END)
  .addEdge('sse_relay', END);

export const compiledGraph = graph.compile();
