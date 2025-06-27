import { useMutation, useQuery, useQueryClient } from "react-query";
import { urlAPI } from "../services/api";

export const useShortenUrl = () => {
    const queryClient = useQueryClient();

    return useMutation(urlAPI.shortenUrl, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("userUrls");
        },
        onError: (error) => {
            console.error("Error shortening URL:", error);
        },
    });
};

export const useUserUrls = (page = 1, limit = 10) => {
    return useQuery(
        ["userUrls", page, limit],
        () => urlAPI.getUserUrls(page, limit),
        {
            keepPreviousData: true,
            staleTime: 5 * 60 * 1000, 
            cacheTime: 10 * 60 * 1000, 
            retry: 2,
            retryDelay: (attemptIndex) =>
                Math.min(1000 * 2 ** attemptIndex, 30000),
        }
    );
};

export const useUrlAnalytics = (shortId) => {
    return useQuery(
        ["urlAnalytics", shortId],
        () => urlAPI.getAnalytics(shortId),
        {
            enabled: !!shortId,
            staleTime: 2 * 60 * 1000, 
            cacheTime: 5 * 60 * 1000, 
            retry: 1,
        }
    );
};

export const useHealthCheck = () => {
    return useQuery("healthCheck", urlAPI.healthCheck, {
        staleTime: 30 * 1000, 
        cacheTime: 60 * 1000, 
        retry: 2,
        refetchInterval: 5 * 60 * 1000, 
        refetchIntervalInBackground: true,
    });
};
