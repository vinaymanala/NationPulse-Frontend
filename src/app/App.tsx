import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CssBaseline } from '@mui/material';
import { theme } from '@shared/styles/theme';
import AppRoutes from '@app/AppRoutes';
import './index.css';
import AuthProvider from './context';
import React from 'react';

// Create a single QueryClient instance with sensible defaults to avoid
// re-creating it on every render (which causes cache reset and refetches).
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      // keep data for 5 minutes to reduce immediate refetches
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function App() {
  // React.useEffect(() => {
  //   const handlePageHide = (event: PageTransitionEvent) => {
  //     if (event.persisted === false) {
  //       localStorage.removeItem('user');
  //       localStorage.removeItem('permissions');
  //     }
  //   };

  //   window.addEventListener('pagehide', handlePageHide);
  //   return () => window.removeEventListener('pagehide', handlePageHide);
  // });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CssBaseline />
          <AppRoutes />
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
