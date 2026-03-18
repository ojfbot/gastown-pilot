import { Annotation } from '@langchain/langgraph';
import type {
  AgentStatus,
  ConvoyProgress,
  FormulaDefinition,
  WastelandWantedItem,
  CharacterSheet,
  GtCommandResult,
} from '@ojfbot/gastown-pilot-shared';

/**
 * GasTownPilot agent-graph state schema.
 *
 * This is the first live consumer of @core/workflows Gas Town primitives (A3 pattern).
 * The prime node calls runPrimeNode to check hooks and route autonomously.
 */
export const GasTownPilotStateAnnotation = Annotation.Root({
  // Core LangGraph fields
  messages: Annotation<string[]>({
    reducer: (a, b) => [...a, ...b],
    default: () => [],
  }),
  threadId: Annotation<string>({
    reducer: (_, b) => b,
    default: () => '',
  }),

  // Routing
  route: Annotation<
    'prime' | 'bead_query' | 'gt_command' | 'sse_relay' | 'await_input' | 'budget_exhausted' | 'await_approval'
  >({
    reducer: (_, b) => b,
    default: () => 'prime',
  }),

  // Agent tree state
  agents: Annotation<Array<{ id: string; name: string; rig: string; status: AgentStatus; task: string }>>({
    reducer: (_, b) => b,
    default: () => [],
  }),

  // Convoy progress
  convoys: Annotation<ConvoyProgress[]>({
    reducer: (_, b) => b,
    default: () => [],
  }),

  // Formula library
  formulas: Annotation<FormulaDefinition[]>({
    reducer: (_, b) => b,
    default: () => [],
  }),

  // Wasteland state
  wastelandJoined: Annotation<boolean>({
    reducer: (_, b) => b,
    default: () => false,
  }),
  wantedItems: Annotation<WastelandWantedItem[]>({
    reducer: (_, b) => b,
    default: () => [],
  }),
  characterSheet: Annotation<CharacterSheet | null>({
    reducer: (_, b) => b,
    default: () => null,
  }),

  // Command results
  lastCommand: Annotation<GtCommandResult | null>({
    reducer: (_, b) => b,
    default: () => null,
  }),

  // Error handling
  error: Annotation<string | null>({
    reducer: (_, b) => b,
    default: () => null,
  }),
});

export type GasTownPilotState = typeof GasTownPilotStateAnnotation.State;
