import React from "react";

export function LoadingSpinner({ size = "md", className = "" }) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
    };

    return (
        <div
            className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${sizeClasses[size]} ${className}`}
            role="status"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export function LoadingOverlay({ message = "Loading..." }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center space-x-3">
                <LoadingSpinner size="lg" className="text-blue-600" />
                <span className="text-gray-900 dark:text-white">{message}</span>
            </div>
        </div>
    );
}

export function InlineLoading({ message = "Loading...", className = "" }) {
    return (
        <div
            className={`flex items-center justify-center space-x-2 ${className}`}
        >
            <LoadingSpinner size="sm" className="text-blue-600" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">
                {message}
            </span>
        </div>
    );
}
