import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { toast } from 'react-toastify';

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (!browserQueryClient)
    browserQueryClient = new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => toast.error(error.message),
      }),
      defaultOptions: {
        queries: {
          retry: 0,
        },
      },
    });

  return browserQueryClient;
};

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
