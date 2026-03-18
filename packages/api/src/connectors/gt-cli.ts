import type { GtCommandResult } from '@ojfbot/gastown-pilot-shared';
import { getLogger } from '../utils/logger.js';

const log = getLogger('gt-cli');

/**
 * Gas Town CLI adapter.
 *
 * All mutations go through the gt CLI — Gas Town owns validation and
 * the fork/PR flow. Never write to Dolt directly for mutations.
 *
 * SCAFFOLD: All methods return stubbed results. Wire to child_process.exec
 * when gt CLI is installed and available.
 */
export class GtCliAdapter {
  private hqPath: string;

  constructor(hqPath: string = process.env.GT_HQ_PATH ?? '~/gt') {
    this.hqPath = hqPath;
  }

  async execute(command: string): Promise<GtCommandResult> {
    log.info(`stubbed: ${command}`);
    // SCAFFOLD: stub — replace with child_process.exec
    return {
      success: true,
      output: `stubbed: ${command}`,
      command,
    };
  }

  async sling(beadId: string, agentId: string): Promise<GtCommandResult> {
    return this.execute(`gt sling ${beadId} ${agentId}`);
  }

  async nudge(agentId: string): Promise<GtCommandResult> {
    return this.execute(`gt nudge ${agentId}`);
  }

  async handoff(agentId: string): Promise<GtCommandResult> {
    return this.execute(`gt handoff ${agentId}`);
  }

  async convoyCreate(title: string, beadIds: string[]): Promise<GtCommandResult> {
    return this.execute(`gt convoy create "${title}" ${beadIds.join(' ')}`);
  }

  async beadCreate(title: string): Promise<GtCommandResult> {
    return this.execute(`gt bead create "${title}"`);
  }

  async beadClose(id: string): Promise<GtCommandResult> {
    return this.execute(`gt bead close ${id}`);
  }

  async doctor(rigName?: string): Promise<GtCommandResult> {
    return this.execute(rigName ? `gt doctor --rig=${rigName}` : 'gt doctor');
  }

  async wastelandClaim(id: string): Promise<GtCommandResult> {
    return this.execute(`gt wl claim ${id}`);
  }

  async wastelandPost(title: string, description: string, effort: string, tags: string[]): Promise<GtCommandResult> {
    return this.execute(`gt wl post --title="${title}" --description="${description}" --effort=${effort} --tags=${tags.join(',')}`);
  }

  async wastelandDone(id: string, evidence: string, commit?: string): Promise<GtCommandResult> {
    const commitFlag = commit ? ` --commit=${commit}` : '';
    return this.execute(`gt wl done ${id} --evidence="${evidence}"${commitFlag}`);
  }

  async wastelandSync(): Promise<GtCommandResult> {
    return this.execute('gt wl sync');
  }
}
