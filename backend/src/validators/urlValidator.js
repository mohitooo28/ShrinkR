const validator = require("validator");

const validateUrl = (url) => {
    const errors = [];

    if (!url) {
        errors.push("URL is required");
        return { isValid: false, errors };
    }

    if (typeof url !== "string") {
        errors.push("URL must be a string");
        return { isValid: false, errors };
    }

    const trimmedUrl = url.trim();
    if (trimmedUrl.length === 0) {
        errors.push("URL cannot be empty");
        return { isValid: false, errors };
    }

    if (trimmedUrl.length > 2048) {
        errors.push("URL is too long (maximum 2048 characters)");
        return { isValid: false, errors };
    }

    if (
        !validator.isURL(trimmedUrl, {
            protocols: ["http", "https"],
            require_protocol: true,
            require_valid_protocol: true,
            allow_query_components: true,
            allow_fragments: true,
            allow_trailing_dot: false,
            allow_protocol_relative_urls: false,
        })
    ) {
        errors.push(
            "Invalid URL format. URL must start with http:// or https://"
        );
        return { isValid: false, errors };
    }

    const maliciousPatterns = [
        /javascript:/i,
        /data:/i,
        /vbscript:/i,
        /file:/i,
        /ftp:/i,
    ];

    if (maliciousPatterns.some((pattern) => pattern.test(trimmedUrl))) {
        errors.push("URL contains potentially malicious content");
        return { isValid: false, errors };
    }

    if (process.env.NODE_ENV === "production") {
        const blockedHosts = [
            /localhost/i,
            /127\.0\.0\.1/,
            /192\.168\./,
            /10\./,
            /172\.(1[6-9]|2[0-9]|3[0-1])\./,
        ];

        if (blockedHosts.some((pattern) => pattern.test(trimmedUrl))) {
            errors.push("Private/local URLs are not allowed");
            return { isValid: false, errors };
        }
    }

    return { isValid: true, errors: [], cleanUrl: trimmedUrl };
};

const validateShortId = (shortId) => {
    const errors = [];

    if (!shortId) {
        errors.push("Short ID is required");
        return { isValid: false, errors };
    }

    if (typeof shortId !== "string") {
        errors.push("Short ID must be a string");
        return { isValid: false, errors };
    }

    const trimmedId = shortId.trim();

    if (trimmedId.length === 0) {
        errors.push("Short ID cannot be empty");
        return { isValid: false, errors };
    }

    if (!/^[a-zA-Z0-9]+$/.test(trimmedId)) {
        errors.push("Short ID can only contain letters and numbers");
        return { isValid: false, errors };
    }

    if (trimmedId.length < 4 || trimmedId.length > 8) {
        errors.push("Short ID must be between 4 and 8 characters");
        return { isValid: false, errors };
    }

    return { isValid: true, errors: [], cleanShortId: trimmedId };
};

module.exports = {
    validateUrl,
    validateShortId,
};
