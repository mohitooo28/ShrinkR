import AnalyticsSummaryCards from "./AnalyticsSummaryCards.jsx";
import AnalyticsUrlDisplay from "./AnalyticsUrlDisplay.jsx";
import AnalyticsVisitHistory from "./AnalyticsVisitHistory.jsx";

const AnalyticsDashboard = ({ analyticsData, isLoading }) => {
    return (
        <div className="mt-4 sm:mt-6 relative">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
                    <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                            Loading analytics...
                        </span>
                    </div>
                </div>
            )}

            <div
                className={`bg-white dark:bg-[#1F2937] border-2 border-blue-200 dark:border-blue-700 rounded-lg p-3 sm:p-4 transition-opacity duration-200 ${
                    isLoading ? "opacity-50" : "opacity-100"
                }`}
            >
                <h3 className="text-base sm:text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3 sm:mb-4 flex items-center">
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    Analytics Dashboard
                </h3>

                {/* Analytics Summary Cards */}
                <AnalyticsSummaryCards analyticsData={analyticsData} />

                {/* URL Display Section */}
                <AnalyticsUrlDisplay analyticsData={analyticsData} />

                {/* Visit History Section */}
                <div>
                    <div className="flex items-center mb-3 sm:mb-4">
                        <svg
                            className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h4 className="text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400">
                            Visit History
                        </h4>
                    </div>
                    <div className="bg-white dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700 max-h-64 sm:max-h-80 overflow-y-auto">
                        <AnalyticsVisitHistory analyticsData={analyticsData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
