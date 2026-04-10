import mysql from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';
import type {
  ConvoyProgress,
  FormulaDefinition,
  RigHealth,
} from '@ojfbot/gastown-pilot-shared';
import { getLogger } from '../utils/logger.js';

const log = getLogger('dolt-sql');

interface BeadRow {
  id: string;
  type: string;
  status: string;
  title: string;
  body: string | null;
  labels: string | Record<string, string> | null;
  actor: string;
  hook: string | null;
  molecule: string | null;
  refs: string | string[] | null;
  created_at: Date | string;
  updated_at: Date | string;
  closed_at: Date | string | null;
}

/**
 * Dolt SQL client for reads against the Gas Town Dolt database.
 *
 * Connects to local Dolt sql-server (port 3307) for bead queries,
 * agent aggregation, convoy stats, and formula lookups.
 *
 * Beads are live from Dolt. Agents/convoys/rigs/formulas remain stubbed
 * until those tables are populated.
 */
export class DoltSqlClient {
  private pool: Pool;

  constructor(
    host: string = process.env.DOLT_HOST ?? '127.0.0.1',
    port: number = Number(process.env.DOLT_PORT ?? 3307),
  ) {
    this.pool = mysql.createPool({
      host,
      port,
      user: 'root',
      database: '.beads-dolt',
      waitForConnections: true,
      connectionLimit: 3,
    });
    log.info(`connected to Dolt at ${host}:${port}`);
  }

  async queryBeads(filter: {
    type?: string;
    status?: string;
    prefix?: string;
    actor?: string;
  } = {}): Promise<BeadRow[]> {
    const conditions: string[] = [];
    const params: string[] = [];

    if (filter.type) { conditions.push('type = ?'); params.push(filter.type); }
    if (filter.status) { conditions.push('status = ?'); params.push(filter.status); }
    if (filter.prefix) { conditions.push('id LIKE ?'); params.push(filter.prefix + '-%'); }
    if (filter.actor) { conditions.push('actor = ?'); params.push(filter.actor); }

    let sql = 'SELECT * FROM beads';
    if (conditions.length > 0) sql += ' WHERE ' + conditions.join(' AND ');
    sql += ' ORDER BY created_at DESC LIMIT 200';

    try {
      const [rows] = await this.pool.execute(sql, params);
      return (rows as BeadRow[]).map((r) => ({
        ...r,
        labels: typeof r.labels === 'string' ? JSON.parse(r.labels) : r.labels ?? {},
        refs: typeof r.refs === 'string' ? JSON.parse(r.refs) : r.refs ?? [],
        created_at: r.created_at instanceof Date ? r.created_at.toISOString() : r.created_at,
        updated_at: r.updated_at instanceof Date ? r.updated_at.toISOString() : r.updated_at,
        closed_at: r.closed_at instanceof Date ? r.closed_at.toISOString() : r.closed_at,
      }));
    } catch (err) {
      log.error('queryBeads failed:', err);
      return [];
    }
  }

  async getAgents(): Promise<Array<{ id: string; name: string; rig: string; status: string; task: string }>> {
    // Query agent-type beads from Dolt
    try {
      const [rows] = await this.pool.execute(
        "SELECT id, title, actor, status, labels FROM beads WHERE type = 'agent' ORDER BY created_at DESC",
      );
      const agents = (rows as BeadRow[]).map((r) => {
        const labels = typeof r.labels === 'string' ? JSON.parse(r.labels) : r.labels ?? {};
        return {
          id: r.id,
          name: r.title,
          rig: (labels as Record<string, string>).rig ?? r.actor,
          status: r.status,
          task: (labels as Record<string, string>).current_task ?? '',
        };
      });
      if (agents.length > 0) return agents;
    } catch (err) {
      log.warn('getAgents from Dolt failed, using fallback:', err);
    }
    // Fallback stubs until agent beads are populated
    return [
      { id: 'shell-mayor-001', name: 'Mayor', rig: 'shell', status: 'idle', task: '' },
      { id: 'cv-witness-001', name: 'CV Witness', rig: 'cv-builder', status: 'idle', task: '' },
    ];
  }

  async getConvoys(): Promise<ConvoyProgress[]> {
    // Query convoy-type beads from Dolt
    try {
      const [rows] = await this.pool.execute(
        "SELECT id, title, status, labels, refs FROM beads WHERE type = 'convoy' ORDER BY created_at DESC",
      );
      const convoys = (rows as BeadRow[]).map((r) => {
        const labels = typeof r.labels === 'string' ? JSON.parse(r.labels) : r.labels ?? {};
        const refs = typeof r.refs === 'string' ? JSON.parse(r.refs) : r.refs ?? [];
        return {
          id: r.id,
          title: r.title,
          status: r.status as ConvoyProgress['status'],
          slotCount: (refs as string[]).length,
          completedSlots: 0,
          slots: [],
          ...labels,
        } as ConvoyProgress;
      });
      if (convoys.length > 0) return convoys;
    } catch (err) {
      log.warn('getConvoys from Dolt failed:', err);
    }
    return [];
  }

  async getRigs(): Promise<RigHealth[]> {
    // Stub — rig health comes from live port checks, not Dolt
    return [
      { name: 'cv-builder', gitUrl: 'ojfbot/cv-builder', agentCount: 2, health: 'healthy', activeConvoys: 0, mergeQueueDepth: 0 },
      { name: 'blogengine', gitUrl: 'ojfbot/blogengine', agentCount: 1, health: 'healthy', activeConvoys: 0, mergeQueueDepth: 0 },
      { name: 'tripplanner', gitUrl: 'ojfbot/TripPlanner', agentCount: 1, health: 'healthy', activeConvoys: 0, mergeQueueDepth: 0 },
    ];
  }

  async getFormulas(): Promise<FormulaDefinition[]> {
    // Stub — formulas are static definitions
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
    await this.pool.end();
    log.info('connection closed');
  }
}
