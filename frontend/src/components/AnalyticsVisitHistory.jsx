import { getDeviceInfo } from "../utils/helpers.jsx";

const AnalyticsVisitHistory = ({ analyticsData }) => {
    if (!analyticsData?.analytics || analyticsData.analytics.length === 0) {
        return (
            <div className="flex items-center justify-center p-8 text-center">
                <div>
                    <svg
                        className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No visits yet
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                        Share your short URL to start tracking visits!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            #
                        </th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Time
                        </th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Device
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {analyticsData.analytics.map((visit, index) => {
                        const visitDate = new Date(visit.timestamp);
                        const fullDate = visitDate.toLocaleDateString();
                        const fullTime = visitDate.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        });
                        const deviceInfo = getDeviceInfo(visit.userAgent);

                        return (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                                <td className="py-3 px-6">
                                    <span className="text-sm text-gray-900 dark:text-gray-200 font-medium">
                                        {visit.visitNumber}
                                    </span>
                                </td>
                                <td className="py-3 px-6">
                                    <span className="text-sm text-gray-900 dark:text-gray-200">
                                        {fullDate}
                                    </span>
                                </td>
                                <td className="py-3 px-6">
                                    <span className="text-sm text-gray-900 dark:text-gray-200">
                                        {fullTime}
                                    </span>
                                </td>
                                <td className="py-3 px-6">
                                    <span className="text-sm text-gray-900 dark:text-gray-200">
                                        {deviceInfo
                                            ? deviceInfo.text
                                            : "Unknown"}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AnalyticsVisitHistory;
