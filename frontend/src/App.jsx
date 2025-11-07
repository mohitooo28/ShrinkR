import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header.jsx";
import UrlShortener from "./components/UrlShortener.jsx";
import Analytics from "./components/Analytics.jsx";
import { AppErrorBoundary } from "./components/ErrorBoundary.jsx";
import { useDarkMode } from "./hooks/useDarkMode.js";
import { useHealthCheck } from "./hooks/useApi.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

function AppContent() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const { data: healthData, isError: healthError } = useHealthCheck();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 pattern-background h-full min-h-screen flex flex-col">
      {healthError && (
        <div className="bg-red-600 text-white text-center py-2 text-sm">
          ⚠️ Service temporarily unavailable. Some features may not work
          properly.
        </div>
      )}

      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        <div className="main-backdrop rounded-2xl p-6 sm:p-8 space-y-8">
          <UrlShortener />
          <Analytics />
        </div>
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? "#374151" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "#111827",
            border: isDarkMode ? "1px solid #4B5563" : "1px solid #E5E7EB",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}

export default App;
