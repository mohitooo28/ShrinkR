const AnalyticsUrlDisplay = ({ analyticsData }) => {
    return (
        <div className="space-y-3 mb-4 sm:mb-6">
            {/* Original URL Display */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                    <svg
                        className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-1 text-sm">
                            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                Original URL:
                            </span>
                            <a
                                href={analyticsData.originalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-1 underline-offset-2 hover:decoration-2 transition-all duration-200 break-all cursor-pointer"
                            >
                                {analyticsData.originalUrl}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Short URL Display */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                    <svg
                        className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                    </svg>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-1 text-sm">
                            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                Short URL:
                            </span>
                            <a
                                href={`${window.location.origin}/${analyticsData.shortId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-1 underline-offset-2 hover:decoration-2 transition-all duration-200 break-all cursor-pointer"
                            >
                                {`${window.location.origin}/${analyticsData.shortId}`}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsUrlDisplay;
