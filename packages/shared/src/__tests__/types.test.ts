import { describe, it, expect } from 'vitest';
import { TAB_SLUGS, PANEL_TABS } from '../types.js';

describe('shared types', () => {
  it('exports 6 tab slugs', () => {
    expect(TAB_SLUGS).toHaveLength(6);
  });

  it('PANEL_TABS covers every tab slug', () => {
    const panelSlugs = PANEL_TABS.map(p => p.slug);
    for (const slug of TAB_SLUGS) {
      expect(panelSlugs).toContain(slug);
    }
  });
});
