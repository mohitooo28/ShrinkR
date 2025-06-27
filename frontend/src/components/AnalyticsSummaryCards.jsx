const AnalyticsSummaryCards = ({ analyticsData }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Total Clicks Card */}
            <div className="bg-gradient-to-r from-blue-600/80 to-white dark:from-blue-600/60 dark:to-gray-800/80 rounded-xl p-4 shadow-lg border border-blue-200 dark:border-blue-700/50">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="ml-3">
                        <p className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
                            Total Clicks
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-blue-800 dark:text-blue-200">
                            {analyticsData.totalClicks}
                        </p>
                    </div>
                </div>
            </div>

            {/* Created Date Card */}
            <div className="bg-gradient-to-r from-emerald-600/80 to-white dark:from-emerald-600/60 dark:to-gray-800/80 rounded-xl p-4 shadow-lg border border-emerald-200 dark:border-emerald-700/50">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="p-2 bg-emerald-600 rounded-lg">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="ml-3">
                        <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">
                            Created
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-emerald-800 dark:text-emerald-200">
                            {new Date(
                                analyticsData.createdAt
                            ).toLocaleDateString() +
                                " " +
                                new Date(
                                    analyticsData.createdAt
                                ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Short URL Card */}
            <div className="bg-gradient-to-r from-purple-600/80 to-white dark:from-purple-600/60 dark:to-gray-800/80 rounded-xl p-4 shadow-lg border border-purple-200 dark:border-purple-700/50">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="p-2 bg-purple-600 rounded-lg">
                            <svg
                                className="w-6 h-6 text-white"
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
                        </div>
                    </div>
                    <div className="ml-3">
                        <p className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300">
                            Short ID
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-purple-800 dark:text-purple-200 break-all">
                            {analyticsData.shortId}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsSummaryCards;
