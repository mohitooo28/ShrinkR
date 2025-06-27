import { useState } from "react";
import { extractErrorMessage } from "../utils/helpers.jsx";

export const useAnalytics = () => {
    const [shortId, setShortId] = useState("");
    const [analyticsData, setAnalyticsData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoading) return; 

        setIsLoading(true);
        setError("");

        let cleanShortId = shortId.trim();
        if (cleanShortId.includes("/")) {
            cleanShortId = cleanShortId.split("/").pop();
        }

        if (!cleanShortId) {
            setError("Please enter a valid Short ID or URL");
            setIsLoading(false);
            return;
        }

        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(
                `${apiBaseUrl}/url/analytics/${cleanShortId}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Short URL not found or invalid");
            }

            const data = await response.json();

            if (response.ok) {
                setAnalyticsData(data.data);
                setError(""); 
            } else {
                let errorMessage = extractErrorMessage(
                    data,
                    "Short URL not found"
                );
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error("Analytics error:", error);
            const errorMessage = extractErrorMessage(
                error,
                "Short URL not found or invalid"
            );
            setError(errorMessage);
            setAnalyticsData(null); 
        } finally {
            setIsLoading(false);
        }
    };

    return {
        shortId,
        setShortId,
        analyticsData,
        error,
        isLoading,
        handleSubmit,
    };
};
