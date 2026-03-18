import React from 'react';
import { Grid, Column } from '@carbon/react';
import AgentTree from './AgentTree';
import ConvoyTracker from './ConvoyTracker';
import EventStream from './EventStream';
import ProblemsView from './ProblemsView';

/** Town tab — 4-panel overview: AgentTree + ConvoyTracker + EventStream + ProblemsView */
export default function TownView() {
  return (
    <Grid className="gastown-town-grid" narrow>
      <Column lg={6} md={4} sm={4}>
        <AgentTree />
      </Column>
      <Column lg={5} md={4} sm={4}>
        <ConvoyTracker />
      </Column>
      <Column lg={5} md={4} sm={4}>
        <ProblemsView />
      </Column>
      <Column lg={16} md={8} sm={4}>
        <EventStream />
      </Column>
    </Grid>
  );
}
