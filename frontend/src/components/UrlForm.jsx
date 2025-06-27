import { useState } from "react";
import toast from "react-hot-toast";
import InputField from "./InputField.jsx";

const UrlForm = ({ onSubmit, isLoading }) => {
    const [url, setUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [urlError, setUrlError] = useState("");
    const [customAliasValidation, setCustomAliasValidation] = useState({
        isValid: true,
        messages: [],
    });

    const validateCustomAlias = (value) => {
        const validation = {
            isValid: true,
            messages: [],
        };

        if (value === "") {
            return validation;
        }

        if (value.length < 4) {
            validation.isValid = false;
            validation.messages.push("Must be at least 4 characters");
        }

        if (value.length > 8) {
            validation.isValid = false;
            validation.messages.push("Must be no more than 8 characters");
        }

        if (!/^[a-zA-Z0-9]*$/.test(value)) {
            validation.isValid = false;
            validation.messages.push("Only letters and numbers allowed");
        }

        const reservedWords = [
            "admin",
            "api",
            "www",
            "help",
            "about",
            "contact",
            "login",
            "register",
            "dashboard",
            "settings",
            "config",
            "system",
            "app",
            "home",
            "index",
            "main",
            "blog",
            "news",
            "docs",
        ];

        if (reservedWords.includes(value.toLowerCase())) {
            validation.isValid = false;
            validation.messages.push("This ID is reserved");
        }

        return validation;
    };

    const validateUrl = (input) => {
        if (!input.trim()) {
            return "URL is required";
        }

        // Add protocol if missing
        let urlToValidate = input.trim();
        if (!/^https?:\/\//i.test(urlToValidate)) {
            urlToValidate = `https://${urlToValidate}`;
        }

        try {
            new URL(urlToValidate);
            return "";
        } catch (error) {
            return "Please enter a valid URL";
        }
    };

    const handleUrlChange = (e) => {
        const value = e.target.value;
        setUrl(value);

        if (value.trim()) {
            const error = validateUrl(value);
            setUrlError(error);
        } else {
            setUrlError("");
        }
    };

    const handleCustomAliasChange = (e) => {
        const value = e.target.value;
        setCustomAlias(value);
        setCustomAliasValidation(validateCustomAlias(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateUrl(url);
        if (error) {
            setUrlError(error);
            return;
        }

        if (!customAliasValidation.isValid) {
            toast.error(
                "Custom ID validation failed: " +
                    customAliasValidation.messages.join(", ")
            );
            return;
        }

        // Add protocol if missing
        let processedUrl = url.trim();
        if (!/^https?:\/\//i.test(processedUrl)) {
            processedUrl = `https://${processedUrl}`;
        }

        try {
            await onSubmit(processedUrl, customAlias.trim());
            setUrl("");
            setCustomAlias("");
            setUrlError("");
            setCustomAliasValidation({ isValid: true, messages: [] });
        } catch (error) {
            console.error("Submission error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="url"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                    Enter URL to shorten
                </label>
                <InputField
                    id="url"
                    name="url"
                    type="url"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder="https://example.com"
                    className={`${
                        urlError
                            ? "border-red-300 dark:border-red-600"
                            : "border-gray-300 dark:border-gray-600"
                    }`}
                    disabled={isLoading}
                    showIcon={true}
                />
                {urlError && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {urlError}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="customAlias"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                    Custom Short ID (Optional)
                </label>
                <div
                    className={`flex flex-col sm:flex-row rounded-lg overflow-hidden border ${
                        customAlias === ""
                            ? "border-gray-300 dark:border-gray-600"
                            : customAliasValidation.isValid
                            ? "border-green-500"
                            : "border-red-500"
                    } focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent`}
                >
                    {/* Domain prefix */}
                    <div className="flex items-center justify-center sm:justify-start px-3 py-2 sm:py-0 bg-gray-50 dark:bg-gray-800 border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-600">
                        <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                            {import.meta.env.VITE_API_BASE_URL ||
                                "http://localhost:3000"}
                            /
                        </span>
                    </div>
                    {/* Input field */}
                    <div className="flex-1 relative">
                        <input
                            id="customAlias"
                            placeholder="mylink"
                            maxLength="8"
                            value={customAlias}
                            onChange={handleCustomAliasChange}
                            className="w-full px-3 py-2 sm:py-3 border-0 focus:ring-0 outline-none transition-all text-gray-900 dark:text-white bg-white dark:bg-gray-700 text-sm sm:text-base"
                            pattern="[a-zA-Z0-9]{4,8}"
                            disabled={isLoading}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {customAlias.length}/8
                            </span>
                        </div>
                    </div>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    4-8 characters, letters and numbers only. Leave empty for
                    random ID.
                </p>

                {customAlias !== "" && (
                    <div className="mt-1 text-xs">
                        {customAliasValidation.isValid ? (
                            <span className="text-green-600 dark:text-green-400">
                                ✓ Valid custom ID
                            </span>
                        ) : (
                            customAliasValidation.messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className="text-red-600 dark:text-red-400"
                                >
                                    • {msg}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={
                    isLoading ||
                    !!urlError ||
                    !url.trim() ||
                    !customAliasValidation.isValid
                }
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:text-gray-200 dark:disabled:text-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
                {isLoading ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Shortening...</span>
                    </>
                ) : (
                    <>
                        <svg
                            className="w-5 h-5"
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
                        <span>Shorten URL</span>
                    </>
                )}
            </button>
        </form>
    );
};

export default UrlForm;
