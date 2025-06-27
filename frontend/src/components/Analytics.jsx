import AnalyticsForm from "./AnalyticsForm.jsx";
import AnalyticsDashboard from "./AnalyticsDashboard.jsx";
import { useAnalytics } from "../hooks/useAnalytics.js";

const Analytics = () => {
    const {
        shortId,
        setShortId,
        analyticsData,
        error,
        isLoading,
        handleSubmit,
    } = useAnalytics();

    return (
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50 p-4 sm:p-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                URL Analytics
            </h2>

            <AnalyticsForm
                shortId={shortId}
                setShortId={setShortId}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />

            {/* Analytics Result */}
            {analyticsData && (
                <AnalyticsDashboard
                    analyticsData={analyticsData}
                    isLoading={isLoading}
                />
            )}

            {/* Analytics Error */}
            {error && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-xs sm:text-sm text-red-800 dark:text-red-400">
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Analytics;
