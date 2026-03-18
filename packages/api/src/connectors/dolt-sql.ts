import type {
  ConvoyProgress,
  FormulaDefinition,
  RigHealth,
} from '@ojfbot/gastown-pilot-shared';
import { getLogger } from '../utils/logger.js';

const log = getLogger('dolt-sql');

/**
 * Dolt SQL client for rich reads against the Gas Town Dolt database.
 *
 * Connects to local Dolt server (MySQL-compatible) for bead search,
 * agent aggregation, convoy stats, and formula queries.
 *
 * SCAFFOLD: All methods return stubbed data. Wire to mysql2 when
 * Dolt server is available.
 */
export class DoltSqlClient {
  private host: string;
  private port: number;

  constructor(
    host: string = process.env.DOLT_HOST ?? 'localhost',
    port: number = Number(process.env.DOLT_PORT ?? 3306),
  ) {
    this.host = host;
    this.port = port;
    log.info(`initialized (stubbed) — ${this.host}:${this.port}`);
  }

  async getAgents(): Promise<Array<{ id: string; name: string; rig: string; status: string; task: string }>> {
    // SCAFFOLD: stub
    return [
      { id: 'shell-mayor-001', name: 'Mayor', rig: 'shell', status: 'idle', task: '' },
      { id: 'cv-witness-001', name: 'CV Witness', rig: 'cv-builder', status: 'idle', task: '' },
    ];
  }

  async getConvoys(): Promise<ConvoyProgress[]> {
    // SCAFFOLD: stub
    return [];
  }

  async getRigs(): Promise<RigHealth[]> {
    // SCAFFOLD: stub
    return [
      { name: 'cv-builder', gitUrl: 'ojfbot/cv-builder', agentCount: 2, health: 'healthy', activeConvoys: 0, mergeQueueDepth: 0 },
      { name: 'blogengine', gitUrl: 'ojfbot/blogengine', agentCount: 1, health: 'healthy', activeConvoys: 0, mergeQueueDepth: 0 },
      { name: 'tripplanner', gitUrl: 'ojfbot/TripPlanner', agentCount: 1, health: 'healthy', activeConvoys: 0, mergeQueueDepth: 0 },
    ];
  }

  async getFormulas(): Promise<FormulaDefinition[]> {
    // SCAFFOLD: stub
    return [
      {
        name: 'blog-publish',
        type: 'workflow',
        version: 1,
        description: 'End-to-end blog post publishing',
        steps: [
          { id: 'research', title: 'Research topic', needs: [], acceptanceCriteria: ['3+ sources found'] },
          { id: 'outline', title: 'Create outline', needs: ['research'], acceptanceCriteria: ['Outline approved'] },
          { id: 'draft', title: 'Write draft', needs: ['outline'], acceptanceCriteria: ['Draft complete'] },
          { id: 'edit', title: 'Edit and refine', needs: ['draft'], acceptanceCriteria: ['No grammar issues'] },
          { id: 'publish', title: 'Publish', needs: ['edit'], acceptanceCriteria: ['Live on blog'] },
        ],
        source: 'embedded',
      },
      {
        name: 'maintenance-patrol',
        type: 'patrol',
        version: 1,
        description: 'Automated bead maintenance',
        steps: [
          { id: 'archive-stale', title: 'Archive stale beads', needs: [], acceptanceCriteria: ['Beads closed >30d archived'] },
          { id: 'orphan-check', title: 'Check orphaned hooks', needs: [], acceptanceCriteria: ['No orphans'] },
          { id: 'index-rebuild', title: 'Rebuild index', needs: ['archive-stale', 'orphan-check'], acceptanceCriteria: ['Index consistent'] },
        ],
        source: 'embedded',
      },
    ];
  }

  async close(): Promise<void> {
    log.info('connection closed (stubbed)');
  }
}
