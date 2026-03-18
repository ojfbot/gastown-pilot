import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardContent from './DashboardContent';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,
      refetchOnWindowFocus: false,
    },
  },
});

interface DashboardProps {
  shellMode?: boolean;
}

/**
 * MF export — mounted by shell via Module Federation.
 *
 * Double-Provider pattern: wraps DashboardContent in QueryClientProvider.
 * In shell mode, the shell's Redux Provider is already above this component;
 * QueryClientProvider is additive and does not conflict.
 *
 * shellMode={true} suppresses the app title heading and activates flex-height CSS.
 */
export default function Dashboard({ shellMode = false }: DashboardProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent shellMode={shellMode} />
    </QueryClientProvider>
  );
}
