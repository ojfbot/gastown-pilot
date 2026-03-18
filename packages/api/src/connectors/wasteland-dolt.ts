import type {
  WastelandWantedItem,
  CharacterSheet,
  Stamp,
} from '@ojfbot/gastown-pilot-shared';
import { getLogger } from '../utils/logger.js';

const log = getLogger('wasteland-dolt');

/**
 * Wasteland Dolt client — reads from the local .wasteland/ Dolt clone.
 *
 * This is a SEPARATE Dolt instance from the main Gas Town database.
 * Connects to localhost:${WASTELAND_DOLT_PORT} (default 3307).
 *
 * Writes go exclusively through gt wl CLI proxy (GtCliAdapter).
 * This client is read-only.
 *
 * SCAFFOLD: stub — returns mock data.
 */
export class WastelandDoltClient {
  private host: string;
  private port: number;

  constructor(
    host: string = 'localhost',
    port: number = Number(process.env.WASTELAND_DOLT_PORT ?? 3307),
  ) {
    this.host = host;
    this.port = port;
    log.info(`initialized (stubbed) — ${this.host}:${this.port}`);
  }

  async getWantedItems(status?: string): Promise<WastelandWantedItem[]> {
    // SCAFFOLD: stub
    return [
      {
        id: 'wl-001',
        title: 'Add syntax highlighting to formula viewer',
        description: 'TOML source should be syntax-highlighted in the FormulaLibrary panel',
        effort: 'small',
        tags: ['ui', 'gas-town'],
        status: 'open',
        poster: 'gastownhall',
      },
    ];
  }

  async getCharacterSheet(rigHandle: string): Promise<CharacterSheet | null> {
    // SCAFFOLD: stub
    return {
      rigHandle,
      trustTier: 'registered',
      totalScore: 0,
      stampCount: 0,
      completedItems: 0,
      skills: { quality: 0, reliability: 0, creativity: 0 },
    };
  }

  async getStamps(rigHandle: string): Promise<Stamp[]> {
    // SCAFFOLD: stub
    return [];
  }

  async getLeaderboard(limit: number = 50): Promise<Array<CharacterSheet & { rank: number }>> {
    // SCAFFOLD: stub
    return [];
  }

  async close(): Promise<void> {
    log.info('connection closed (stubbed)');
  }
}
