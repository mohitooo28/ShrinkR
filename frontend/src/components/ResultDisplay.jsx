import { useState } from "react";
import toast from "react-hot-toast";
import ShareModal from "./ShareModal";
import QRModal from "./QRModal";

const ResultDisplay = ({ result, isLoading, onClear }) => {
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareModalClosing, setShareModalClosing] = useState(false);
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const [qrModalClosing, setQrModalClosing] = useState(false);

    const openShareModal = () => {
        if (shareModalClosing) return; // Prevent opening while closing
        setShareModalOpen(true);
        setShareModalClosing(false);
    };

    const closeShareModal = () => {
        if (shareModalClosing) return; // Prevent double-closing
        setShareModalClosing(true);
        setTimeout(() => {
            setShareModalOpen(false);
            setShareModalClosing(false);
        }, 200); // Match the longest animation duration (0.2s)
    };

    const openQrModal = () => {
        if (qrModalClosing) return; // Prevent opening while closing
        setQrModalOpen(true);
        setQrModalClosing(false);
    };

    const closeQrModal = () => {
        if (qrModalClosing) return; // Prevent double-closing
        setQrModalClosing(true);
        setTimeout(() => {
            setQrModalOpen(false);
            setQrModalClosing(false);
        }, 200); // Match the longest animation duration (0.2s)
    };

    if (!result) return null;

    return (
        <>
            <div className="mt-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Your Shortened URL
                    </h3>
                    <button
                        onClick={onClear}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Short URL of :{" "}
                            <span className="text-sm text-gray-500 dark:text-gray-400 break-all">
                                {result.originalUrl}
                            </span>
                        </p>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <a
                                    href={result.shortUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                                >
                                    {result.shortUrl}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(result.shortUrl);
                                toast.success("URL copied to clipboard!");
                            }}
                            className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors button-hover-scale"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                            <span>Copy</span>
                        </button>
                        <button
                            onClick={() => {
                                window.open(
                                    result.shortUrl,
                                    "_blank",
                                    "noopener,noreferrer"
                                );
                            }}
                            className="flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors button-hover-scale"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                            <span>Visit</span>
                        </button>
                        <button
                            onClick={openShareModal}
                            className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors button-hover-scale"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                />
                            </svg>
                            <span>Share</span>
                        </button>
                        <button
                            onClick={openQrModal}
                            className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors button-hover-scale"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                />
                            </svg>
                            <span>QR Code</span>
                        </button>
                    </div>
                </div>
            </div>

            <ShareModal
                isOpen={shareModalOpen}
                isClosing={shareModalClosing}
                onClose={closeShareModal}
                url={result.shortUrl}
            />

            <QRModal
                isOpen={qrModalOpen}
                isClosing={qrModalClosing}
                onClose={closeQrModal}
                url={result.shortUrl}
            />
        </>
    );
};

export default ResultDisplay;
