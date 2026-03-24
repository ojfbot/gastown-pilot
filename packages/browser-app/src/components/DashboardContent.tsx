import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Heading, Tooltip } from '@carbon/react';
import { Menu, Close } from '@carbon/icons-react';
import { DashboardLayout } from '@ojfbot/frame-ui-components';
import '@ojfbot/frame-ui-components/styles/dashboard-layout';
import { PANEL_TABS } from '@ojfbot/gastown-pilot-shared';
import type { PanelTab } from '@ojfbot/gastown-pilot-shared';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setSidebarExpanded, setPanelTab } from '../store/threadsSlice';

// Panel imports
import TownView from './panels/TownView';
import RigsView from './panels/RigsView';
import ConvoysView from './panels/ConvoysView';
import BeadsView from './panels/BeadsView';
import FormulasView from './panels/FormulasView';
import WastelandView from './panels/WastelandView';
import GasTownSidePanel from './GasTownSidePanel';

interface DashboardContentProps {
  shellMode: boolean;
}

const renderTabContent = (slug: PanelTab) => {
  switch (slug) {
    case 'town': return <TownView />;
    case 'rigs': return <RigsView />;
    case 'convoys': return <ConvoysView />;
    case 'beads': return <BeadsView />;
    case 'formulas': return <FormulasView />;
    case 'wasteland': return <WastelandView />;
    default: return <div>Unknown tab</div>;
  }
};

export default function DashboardContent({ shellMode }: DashboardContentProps) {
  const dispatch = useAppDispatch();
  const sidebarExpanded = useAppSelector(s => s.threads.sidebarExpanded);
  const activePanelTab = useAppSelector(s => s.threads.activePanelTab);
  const [activeTab, setActiveTab] = useState<PanelTab>('town');

  const showWasteland = true;

  const visibleTabs = showWasteland
    ? PANEL_TABS
    : PANEL_TABS.filter((t) => t.slug !== 'wasteland');

  return (
    <>
      <GasTownSidePanel
        isExpanded={sidebarExpanded}
        onToggle={() => dispatch(setSidebarExpanded(!sidebarExpanded))}
        activeTab={activePanelTab}
        onTabChange={tab => dispatch(setPanelTab(tab))}
      />

      <DashboardLayout
        shellMode={shellMode}
        sidebarExpanded={sidebarExpanded}
      >
        <DashboardLayout.Header>
          <Heading className="page-header">Gas Town Dashboard</Heading>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Tooltip
              align="bottom-right"
              label={sidebarExpanded ? 'Close panel' : 'Sessions & Chat'}
            >
              <button
                className="sidebar-toggle-btn"
                onClick={() => dispatch(setSidebarExpanded(!sidebarExpanded))}
                aria-label="Toggle sessions / chat panel"
              >
                {sidebarExpanded ? <Close size={20} /> : <Menu size={20} />}
              </button>
            </Tooltip>
          </div>
        </DashboardLayout.Header>

        <Tabs
          selectedIndex={visibleTabs.findIndex((t) => t.slug === activeTab)}
          onChange={({ selectedIndex }) => {
            if (selectedIndex >= 0 && selectedIndex < visibleTabs.length) {
              setActiveTab(visibleTabs[selectedIndex].slug);
            }
          }}
        >
          <TabList aria-label="Gas Town tabs" contained>
            {visibleTabs.map((tab) => (
              <Tab key={tab.slug} data-element={`${tab.slug}-tab`}>
                {tab.label}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {visibleTabs.map((tab) => (
              <TabPanel key={tab.slug} data-element={`${tab.slug}-panel`}>
                {renderTabContent(tab.slug)}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </DashboardLayout>
    </>
  );
}
