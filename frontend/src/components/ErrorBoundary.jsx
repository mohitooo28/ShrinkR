import React from "react";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-red-500">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Oops! Something went wrong
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    We encountered an unexpected error. Please try again.
                </p>

                {import.meta.env.DEV && (
                    <details className="mb-4 text-left">
                        <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Error Details (Development)
                        </summary>
                        <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto text-red-600 dark:text-red-400">
                            {error.message}
                        </pre>
                    </details>
                )}

                <div className="space-y-2">
                    <button
                        onClick={resetErrorBoundary}
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                        Try Again
                    </button>

                    <button
                        onClick={() => window.location.reload()}
                        className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        </div>
    );
}

export function AppErrorBoundary({ children }) {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => {
                // Log error to console in development
                if (import.meta.env.DEV) {
                    console.error(
                        "🔴 Error Boundary Caught:",
                        error,
                        errorInfo
                    );
                }

                // In production, you could send this to an error reporting service
                // like Sentry, LogRocket, etc.
            }}
            onReset={() => {
                // Clear any stale state
                window.location.reload();
            }}
        >
            {children}
        </ErrorBoundary>
    );
}
