import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import QRCode from "qrcode";

const QRModal = ({ isOpen, isClosing, onClose, url }) => {
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleOverlayClick = () => {
        onClose();
    };

    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    const downloadQr = async (format) => {
        try {
            let dataUrl;
            if (format === "svg") {
                dataUrl = await QRCode.toString(url, {
                    type: "svg",
                    width: 300,
                    margin: 2,
                });
                const blob = new Blob([dataUrl], { type: "image/svg+xml" });
                dataUrl = URL.createObjectURL(blob);
            } else {
                dataUrl = await QRCode.toDataURL(url, {
                    width: 300,
                    margin: 2,
                    color: {
                        dark: "#000000",
                        light: "#FFFFFF",
                    },
                });
            }

            const link = document.createElement("a");
            link.download = `qr-code.${format}`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (format === "svg") {
                URL.revokeObjectURL(dataUrl);
            }

            toast.success(`QR code downloaded as ${format.toUpperCase()}`);
        } catch (error) {
            toast.error(
                `Failed to download QR code as ${format.toUpperCase()}`
            );
            console.error("Download error:", error);
        }
    };

    // Generate QR code when modal opens
    const generateQRCode = async () => {
        try {
            const qrDataUrl = await QRCode.toDataURL(url, {
                width: 300,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#FFFFFF",
                },
            });
            setQrCodeDataUrl(qrDataUrl);
        } catch (error) {
            toast.error("Failed to generate QR code");
            console.error("QR generation error:", error);
        }
    };

    // Generate QR code when modal opens
    if (isOpen && !qrCodeDataUrl) {
        generateQRCode();
    }

    // Clear QR code when modal closes
    if (!isOpen && qrCodeDataUrl) {
        setQrCodeDataUrl("");
    }

    if (!isOpen) return null;

    return (
        <div
            onClick={handleOverlayClick}
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4 modal-overlay ${
                isClosing ? "closing" : ""
            }`}
            style={{ pointerEvents: "auto" }}
        >
            <div
                onClick={handleModalContentClick}
                className={`bg-white dark:bg-gray-800 rounded-lg max-w-sm w-full p-6 modal-content ${
                    isClosing ? "closing" : ""
                }`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        QR Code
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <svg
                            className="w-6 h-6"
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

                <div className="text-center space-y-4">
                    {qrCodeDataUrl && (
                        <div className="flex justify-center">
                            <img
                                src={qrCodeDataUrl}
                                alt="QR Code"
                                className="border border-gray-200 dark:border-gray-600 rounded-lg"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Download QR Code:
                        </p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => downloadQr("png")}
                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                            >
                                PNG
                            </button>
                            <button
                                onClick={() => downloadQr("svg")}
                                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors"
                            >
                                SVG
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRModal;
