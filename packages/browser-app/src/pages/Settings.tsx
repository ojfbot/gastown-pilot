import React, { useState } from 'react';
import { TextInput, Toggle, NumberInput, Tile } from '@carbon/react';
import type { GasTownPilotSettings } from '@ojfbot/gastown-pilot-shared';

const DEFAULT_SETTINGS: GasTownPilotSettings = {
  hqPath: '~/gt',
  dashboardPort: 8080,
  doltPort: 3306,
  defaultRig: '',
  showWasteland: false,
  eventRetention: '24h',
  autoNudgeTimeout: 60,
  wastelandDoltPort: 3307,
  wastelands: [],
};

/**
 * Settings panel — MF export for shell SettingsModal.
 * Renders all GasTownPilotSettings fields with Carbon form controls.
 */
export default function Settings() {
  const [settings, setSettings] = useState<GasTownPilotSettings>(DEFAULT_SETTINGS);

  const update = <K extends keyof GasTownPilotSettings>(key: K, value: GasTownPilotSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="gastown-settings">
      <Tile className="gastown-panel">
        <h4>Gas Town Pilot Settings</h4>

        <TextInput
          id="hqPath"
          labelText="Gas Town HQ Path"
          value={settings.hqPath}
          onChange={(e: any) => update('hqPath', e.target.value)}
        />

        <NumberInput
          id="dashboardPort"
          label="Dashboard SSE Port"
          value={settings.dashboardPort}
          onChange={(_e: any, { value }: any) => update('dashboardPort', value)}
          min={1024}
          max={65535}
        />

        <NumberInput
          id="doltPort"
          label="Dolt Server Port"
          value={settings.doltPort}
          onChange={(_e: any, { value }: any) => update('doltPort', value)}
          min={1024}
          max={65535}
        />

        <TextInput
          id="defaultRig"
          labelText="Default Rig"
          value={settings.defaultRig}
          onChange={(e: any) => update('defaultRig', e.target.value)}
        />

        <Toggle
          id="showWasteland"
          labelText="Show Wasteland Tab"
          toggled={settings.showWasteland}
          onToggle={(checked: boolean) => update('showWasteland', checked)}
        />

        <TextInput
          id="eventRetention"
          labelText="Event Retention"
          value={settings.eventRetention}
          onChange={(e: any) => update('eventRetention', e.target.value)}
        />

        <NumberInput
          id="autoNudgeTimeout"
          label="Auto-Nudge Timeout (seconds)"
          value={settings.autoNudgeTimeout}
          onChange={(_e: any, { value }: any) => update('autoNudgeTimeout', value)}
          min={10}
          max={600}
        />

        <NumberInput
          id="wastelandDoltPort"
          label="Wasteland Dolt Port"
          value={settings.wastelandDoltPort}
          onChange={(_e: any, { value }: any) => update('wastelandDoltPort', value)}
          min={1024}
          max={65535}
        />
      </Tile>
    </div>
  );
}
