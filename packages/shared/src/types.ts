// Gas Town Pilot — shared types
// Domain types re-exported from @core/workflows where available;
// pilot-specific types defined here.

/** Settings schema — stored in shell settingsSlice.apps['gastown-pilot'] */
export interface GasTownPilotSettings {
  hqPath: string;
  dashboardPort: number;
  doltPort: number;
  defaultRig: string;
  showWasteland: boolean;
  eventRetention: string;
  autoNudgeTimeout: number;
  wastelandDoltPort: number;
  wastelands: Array<{
    name: string;
    upstream: string;
    localPath: string;
    active: boolean;
  }>;
}

/** Agent status indicators (maps to Carbon Tag variants) */
export type AgentStatus = 'active' | 'idle' | 'stalled' | 'error' | 'dead';

/** Rig health summary */
export interface RigHealth {
  name: string;
  gitUrl: string;
  agentCount: number;
  health: 'healthy' | 'degraded' | 'unhealthy';
  activeConvoys: number;
  mergeQueueDepth: number;
}

/** Convoy progress tracking */
export interface ConvoyProgress {
  id: string;
  title: string;
  total: number;
  done: number;
  active: number;
  blocked: number;
  status: 'forming' | 'active' | 'completed' | 'failed' | 'stalled';
  pending?: number;
  slots?: Array<{ beadId: string; agentId?: string; status: string }>;
}

/** TOML formula definition */
export interface FormulaDefinition {
  name: string;
  type: 'workflow' | 'expansion' | 'aspect' | 'patrol';
  version: number;
  description: string;
  steps: FormulaStep[];
  source: 'embedded' | 'custom';
}

export interface FormulaStep {
  id: string;
  title: string;
  needs: string[];
  acceptanceCriteria: string[];
  status?: 'pending' | 'active' | 'done' | 'failed';
  output?: string;
}

/** Wasteland wanted item (from local Dolt clone) */
export interface WastelandWantedItem {
  id: string;
  title: string;
  description: string;
  effort: string;
  tags: string[];
  status: 'open' | 'claimed' | 'in_review' | 'completed';
  poster: string;
  claimant?: string;
}

/** Character sheet (from local Dolt clone) */
export interface CharacterSheet {
  rigHandle: string;
  trustTier: 'registered' | 'contributor' | 'maintainer';
  totalScore: number;
  stampCount: number;
  completedItems: number;
  skills: {
    quality: number;
    reliability: number;
    creativity: number;
  };
}

/** Stamp attestation */
export interface Stamp {
  id: string;
  quality: number;
  reliability: number;
  creativity: number;
  confidence: number;
  severity: number;
  validator: string;
  completionId: string;
  date: string;
}

/** Result from gt CLI proxy */
export interface GtCommandResult {
  success: boolean;
  output: string;
  command: string;
}

/** Tab definitions */
export type PanelTab = 'town' | 'rigs' | 'convoys' | 'beads' | 'formulas' | 'wasteland';

export const TAB_SLUGS: PanelTab[] = ['town', 'rigs', 'convoys', 'beads', 'formulas', 'wasteland'];

export const PANEL_TABS: Array<{ slug: PanelTab; label: string }> = [
  { slug: 'town', label: 'Town' },
  { slug: 'rigs', label: 'Rigs' },
  { slug: 'convoys', label: 'Convoys' },
  { slug: 'beads', label: 'Beads' },
  { slug: 'formulas', label: 'Formulas' },
  { slug: 'wasteland', label: 'Wasteland' },
];
