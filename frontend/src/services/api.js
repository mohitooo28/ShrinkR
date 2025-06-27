import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true, 
});

apiClient.interceptors.request.use(
    (config) => {
        if (config.method === "get") {
            config.params = {
                ...config.params,
                _t: Date.now(),
            };
        }

        if (import.meta.env.DEV) {
            console.log(
                `🔵 API Request: ${config.method?.toUpperCase()} ${config.url}`,
                config.data
            );
        }

        return config;
    },
    (error) => {
        console.error("🔴 Request Error:", error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        if (import.meta.env.DEV) {
            console.log(`🟢 API Response: ${response.status}`, response.data);
        }
        return response;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            console.error(`🔴 API Error ${status}:`, data);

            switch (status) {
                case 429:
                    error.message =
                        "Too many requests. Please try again later.";
                    break;
                case 500:
                    error.message = "Server error. Please try again later.";
                    break;
                case 503:
                    error.message = "Service temporarily unavailable.";
                    break;
                default:
                    if (data?.error?.message) {
                        error.message = data.error.message;
                    } else if (data?.message) {
                        error.message = data.message;
                    }
            }
        } else if (error.request) {
            console.error("🔴 Network Error:", error.request);
            error.message = "Network error. Please check your connection.";
        } else {
            console.error("🔴 Request Setup Error:", error.message);
        }

        return Promise.reject(error);
    }
);

export const urlAPI = {
    shortenUrl: async (urlData) => {
        const response = await apiClient.post("/url", urlData);
        return response.data;
    },

    getAnalytics: async (shortId) => {
        const response = await apiClient.get(`/url/${shortId}/analytics`);
        return response.data;
    },

    getUserUrls: async (page = 1, limit = 10) => {
        const response = await apiClient.get("/url/user", {
            params: { page, limit },
        });
        return response.data;
    },

    healthCheck: async () => {
        const response = await apiClient.get("/health");
        return response.data;
    },
};

export const isNetworkError = (error) => {
    return !error.response && error.request;
};

export const isServerError = (error) => {
    return error.response && error.response.status >= 500;
};

export const isClientError = (error) => {
    return (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
    );
};

export default apiClient;
