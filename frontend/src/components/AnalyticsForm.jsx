import InputField from "./InputField.jsx";

const AnalyticsForm = ({ shortId, setShortId, onSubmit, isLoading }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label
                    htmlFor="shortId"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                    Enter Short ID or Full URL
                </label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="flex-1">
                        <InputField
                            id="shortId"
                            name="shortId"
                            placeholder="abc12345 or http://localhost:3000/abc12345"
                            value={shortId}
                            onChange={(e) => setShortId(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !shortId.trim()}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                        onClick={(e) => {
                            if (isLoading) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }}
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Loading...
                            </>
                        ) : (
                            "Get Analytics"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AnalyticsForm;
