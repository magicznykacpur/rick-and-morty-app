import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (!browserQueryClient) browserQueryClient = new QueryClient();

  return browserQueryClient;
};

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
