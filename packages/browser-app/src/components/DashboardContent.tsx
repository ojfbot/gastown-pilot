import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
import { PANEL_TABS } from '@ojfbot/gastown-pilot-shared';
import type { PanelTab } from '@ojfbot/gastown-pilot-shared';

// Panel imports
import TownView from './panels/TownView';
import RigsView from './panels/RigsView';
import ConvoysView from './panels/ConvoysView';
import BeadsView from './panels/BeadsView';
import FormulasView from './panels/FormulasView';
import WastelandView from './panels/WastelandView';

interface DashboardContentProps {
  shellMode: boolean;
}

export default function DashboardContent({ shellMode }: DashboardContentProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>('town');

  // SCAFFOLD: read showWasteland from settings when wired to shell settingsSlice
  const showWasteland = true;

  const visibleTabs = showWasteland
    ? PANEL_TABS
    : PANEL_TABS.filter((t) => t.slug !== 'wasteland');

  return (
    <div className={`gastown-dashboard ${shellMode ? 'gastown-shell-mode' : ''}`}>
      {!shellMode && <h1 className="gastown-dashboard-title">Gas Town</h1>}
      <Tabs
        selectedIndex={visibleTabs.findIndex((t) => t.slug === activeTab)}
        onChange={({ selectedIndex }) => {
          if (selectedIndex >= 0 && selectedIndex < visibleTabs.length) {
            setActiveTab(visibleTabs[selectedIndex].slug);
          }
        }}
      >
        <TabList aria-label="Gas Town Pilot tabs">
          {visibleTabs.map((tab) => (
            <Tab key={tab.slug}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel><TownView /></TabPanel>
          <TabPanel><RigsView /></TabPanel>
          <TabPanel><ConvoysView /></TabPanel>
          <TabPanel><BeadsView /></TabPanel>
          <TabPanel><FormulasView /></TabPanel>
          {showWasteland && <TabPanel><WastelandView /></TabPanel>}
        </TabPanels>
      </Tabs>
    </div>
  );
}
