import { useState } from "react";
import toast from "react-hot-toast";
import UrlForm from "./UrlForm.jsx";
import ResultDisplay from "./ResultDisplay.jsx";
import { useShortenUrl } from "../hooks/useApi.js";
import { extractErrorMessage } from "../utils/helpers.jsx";

const UrlShortener = () => {
    const [result, setResult] = useState(null);
    const shortenUrlMutation = useShortenUrl();

    const handleSubmit = async (url, customAlias) => {
        try {
            setResult(null);

            const requestBody = { url: url };
            if (customAlias) {
                requestBody.customId = customAlias;
            }

            const data = await shortenUrlMutation.mutateAsync(requestBody);

            if (data?.data?.id) {
                const backendUrl = import.meta.env.VITE_API_BASE_URL;
                const shortenedUrl = `${backendUrl}/${data.data.id}`;

                setResult({
                    shortUrl: shortenedUrl,
                    originalUrl: url,
                });

                toast.success("URL shortened successfully!");
            }
        } catch (error) {
            let errorMessage = extractErrorMessage(
                error,
                "Something went wrong"
            );

            if (error.response?.data?.error?.code === "ID_TAKEN") {
                errorMessage = `"${customAlias}" is already taken. Please try a different custom ID.`;
            } else if (error.response?.data?.error?.code === "FORBIDDEN_ID") {
                errorMessage = `"${customAlias}" is not allowed. Please choose a different custom ID.`;
            } else if (
                error.response?.data?.error?.code === "VALIDATION_ERROR" &&
                customAlias
            ) {
                errorMessage = `Invalid custom ID: ${errorMessage}`;
            }

            toast.error(errorMessage);
            throw error;
        }
    };

    const handleClear = () => {
        setResult(null);
    };

    return (
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50 p-4 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Shorten a URL
            </h2>

            <UrlForm
                onSubmit={handleSubmit}
                isLoading={shortenUrlMutation.isLoading}
            />

            <ResultDisplay
                result={result}
                isLoading={shortenUrlMutation.isLoading}
                onClear={handleClear}
            />
        </div>
    );
};

export default UrlShortener;
