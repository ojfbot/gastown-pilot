import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '../store/store';
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
 * Double-Provider pattern: wraps DashboardContent in both Redux Provider
 * (for threads/chat state) and QueryClientProvider (for server data).
 * In shell mode, the shell's Redux Provider is already above this component;
 * the inner Provider wins for DashboardContent's own slices.
 */
export default function Dashboard({ shellMode = false }: DashboardProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DashboardContent shellMode={shellMode} />
      </QueryClientProvider>
    </Provider>
  );
}
