import { getLogger } from '../utils/logger.js';

const log = getLogger('sse-relay');

/**
 * SSE relay client — connects to gt dashboard SSE stream and
 * rebroadcasts events to connected browser clients via WebSocket.
 *
 * gt dashboard runs at http://localhost:${GT_DASHBOARD_PORT} and emits:
 * - Agent state changes (idle → working → stalled)
 * - Bead creates, closes, slings
 * - Convoy progress updates
 * - Merge queue state changes
 * - Mail delivery events
 *
 * SCAFFOLD: stub — no actual SSE connection. Returns mock event stream.
 */
export class SseRelayClient {
  private dashboardPort: number;
  private listeners: Set<(event: SseEvent) => void> = new Set();

  constructor(dashboardPort: number = Number(process.env.GT_DASHBOARD_PORT ?? 8080)) {
    this.dashboardPort = dashboardPort;
    log.info(`initialized (stubbed) — port ${this.dashboardPort}`);
  }

  subscribe(callback: (event: SseEvent) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /** Emit a mock event for testing */
  emitMock(event: SseEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  close(): void {
    this.listeners.clear();
    log.info('relay closed (stubbed)');
  }
}

export interface SseEvent {
  type: string;
  timestamp: string;
  data: Record<string, unknown>;
}
