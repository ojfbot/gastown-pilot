import React, { useState } from 'react';
import { Tile, Tabs, TabList, Tab, TabPanels, TabPanel, DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, Button, Tag, ProgressBar } from '@carbon/react';
import { useWastelandWanted, useCharacterSheet, useLeaderboard } from '../../hooks/useWasteland';

/**
 * WastelandView — conditional tab (hidden when showWasteland=false).
 * Four sub-tabs: Wanted Board, My Character Sheet, Leaderboard, Recent Activity.
 */
export default function WastelandView() {
  // SCAFFOLD: stub — hardcoded handle. Wire to settings when available.
  const rigHandle = 'ojfbot-frame';

  return (
    <div className="gastown-wasteland-view">
      <div className="gastown-wasteland-header">
        <Button size="sm" kind="ghost">Sync</Button>
      </div>
      <Tabs>
        <TabList aria-label="Wasteland sub-tabs">
          <Tab>Wanted Board</Tab>
          <Tab>My Character Sheet</Tab>
          <Tab>Leaderboard</Tab>
          <Tab>Recent Activity</Tab>
        </TabList>
        <TabPanels>
          <TabPanel><WantedBoard /></TabPanel>
          <TabPanel><CharacterSheetPanel handle={rigHandle} /></TabPanel>
          <TabPanel><LeaderboardPanel /></TabPanel>
          <TabPanel>
            <Tile className="gastown-panel">
              <p className="gastown-panel-empty">Recent activity — stub</p>
            </Tile>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

function WantedBoard() {
  const { data, isLoading } = useWastelandWanted();
  const items = data?.items ?? [];

  if (isLoading) return <Tile><p className="gastown-panel-loading">Connecting to Wasteland...</p></Tile>;
  if (items.length === 0) return <Tile><p className="gastown-panel-empty">No wanted items — join the Wasteland first</p></Tile>;

  const headers = [
    { key: 'title', header: 'Title' },
    { key: 'effort', header: 'Effort' },
    { key: 'status', header: 'Status' },
    { key: 'poster', header: 'Posted by' },
    { key: 'actions', header: '' },
  ];

  const rows = items.map((item) => ({
    id: item.id,
    title: item.title,
    effort: item.effort,
    status: item.status,
    poster: item.poster,
    actions: item.status === 'open' ? 'Claim' : '',
  }));

  return (
    <DataTable rows={rows} headers={headers}>
      {({ rows: tableRows, headers: tableHeaders, getTableProps, getHeaderProps, getRowProps }: any) => (
        <TableContainer>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {tableHeaders.map((h: any) => <TableHeader {...getHeaderProps({ header: h })} key={h.key}>{h.header}</TableHeader>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.map((row: any) => (
                <TableRow {...getRowProps({ row })} key={row.id}>
                  {row.cells.map((cell: any) => (
                    <TableCell key={cell.id}>
                      {cell.info.header === 'status' ? <Tag size="sm">{cell.value}</Tag> :
                       cell.info.header === 'actions' && cell.value ? <Button size="sm" kind="ghost">{cell.value}</Button> :
                       cell.value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
}

function CharacterSheetPanel({ handle }: { handle: string }) {
  const { data, isLoading } = useCharacterSheet(handle);

  if (isLoading) return <Tile><p className="gastown-panel-loading">Loading character sheet...</p></Tile>;
  if (!data) return <Tile><p className="gastown-panel-empty">No character sheet found</p></Tile>;

  return (
    <Tile className="gastown-panel">
      <h4>Character Sheet — {data.rigHandle}</h4>
      <Tag size="md" type="blue">{data.trustTier.toUpperCase()}</Tag>
      <div className="gastown-skills">
        <div>Quality <ProgressBar value={data.skills.quality} max={100} size="small" /></div>
        <div>Reliability <ProgressBar value={data.skills.reliability} max={100} size="small" /></div>
        <div>Creativity <ProgressBar value={data.skills.creativity} max={100} size="small" /></div>
      </div>
      <p>Total score: {data.totalScore} | Stamps: {data.stampCount} | Completed: {data.completedItems}</p>
    </Tile>
  );
}

function LeaderboardPanel() {
  const { data, isLoading } = useLeaderboard();

  if (isLoading) return <Tile><p className="gastown-panel-loading">Loading leaderboard...</p></Tile>;

  return (
    <Tile className="gastown-panel">
      <h4>Leaderboard</h4>
      <p className="gastown-panel-empty">
        {data?.leaderboard?.length > 0 ? `${data.leaderboard.length} rigs ranked` : 'No leaderboard data yet'}
      </p>
    </Tile>
  );
}
