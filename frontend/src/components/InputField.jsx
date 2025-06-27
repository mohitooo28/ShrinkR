import { useState, useEffect } from "react";

const InputField = ({
    id,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
    className = "",
    maxLength,
    pattern,
    showIcon = true,
}) => {
    const [showClearIcon, setShowClearIcon] = useState(false);

    useEffect(() => {
        setShowClearIcon(value && value.trim().length > 0);
    }, [value]);

    const handleIconClick = async () => {
        if (showClearIcon) {
            onChange({ target: { value: "" } });
        } else {
            try {
                const text = await navigator.clipboard.readText();
                onChange({ target: { value: text } });
            } catch (err) {
                console.error("Failed to read clipboard contents: ", err);
            }
        }
    };

    return (
        <div className="relative">
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                maxLength={maxLength}
                pattern={pattern}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 ${
                    showIcon ? "pr-12 sm:pr-14" : ""
                } border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white bg-white dark:bg-gray-700 text-sm sm:text-base ${className}`}
            />

            {showIcon && (
                <button
                    type="button"
                    onClick={handleIconClick}
                    className="absolute inset-y-0 right-3 flex items-center justify-center w-8 h-full text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-all"
                    title={
                        showClearIcon ? "Clear input" : "Paste from clipboard"
                    }
                >
                    <div className="w-6 h-6 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-500 hover:border-gray-400 dark:hover:border-gray-400 transition-all">
                        {showClearIcon ? (
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                        )}
                    </div>
                </button>
            )}
        </div>
    );
};

export default InputField;
