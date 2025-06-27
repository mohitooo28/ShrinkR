const URL = require("../models/url");
const { generateShortId, isSafeShortId } = require("../utils/shortIdGenerator");
const { validateUrl, validateShortId } = require("../validators/urlValidator");
const {
    createSuccessResponse,
    createErrorResponse,
} = require("../utils/responseHandler");

async function generateNewShortUrl(req, res) {
    try {
        const { url, customId } = req.body;

        const validation = validateUrl(url);
        if (!validation.isValid) {
            return res
                .status(400)
                .json(
                    createErrorResponse(
                        validation.errors.join(", "),
                        400,
                        "VALIDATION_ERROR",
                        { errors: validation.errors }
                    )
                );
        }

        const cleanUrl = validation.cleanUrl;

        let shortId;
        if (customId && customId.trim()) {
            const customIdValidation = validateShortId(customId);
            if (!customIdValidation.isValid) {
                return res
                    .status(400)
                    .json(
                        createErrorResponse(
                            customIdValidation.errors.join(", "),
                            400,
                            "VALIDATION_ERROR",
                            { errors: customIdValidation.errors }
                        )
                    );
            }

            const cleanCustomId = customIdValidation.cleanShortId;

            if (!isSafeShortId(cleanCustomId)) {
                return res
                    .status(400)
                    .json(
                        createErrorResponse(
                            "This custom ID is not allowed. Please choose a different one.",
                            400,
                            "FORBIDDEN_ID"
                        )
                    );
            }

            const existingCustomId = await URL.findOne({
                shortId: cleanCustomId,
                isActive: true,
            });
            if (existingCustomId) {
                return res
                    .status(409)
                    .json(
                        createErrorResponse(
                            "This custom ID is already taken. Please choose a different one.",
                            409,
                            "ID_TAKEN"
                        )
                    );
            }

            shortId = cleanCustomId;
        }

        const existingUrl = await URL.findOne({
            redirectedURL: cleanUrl,
            isActive: true,
        });
        if (existingUrl) {
            return res.json(
                createSuccessResponse(
                    { id: existingUrl.shortId, url: cleanUrl },
                    "Short URL already exists"
                )
            );
        }

        if (!shortId) {
            let isUnique = false;
            let attempts = 0;
            const maxAttempts = 10;

            while (!isUnique && attempts < maxAttempts) {
                shortId = generateShortId();

                if (isSafeShortId(shortId)) {
                    const existing = await URL.findOne({ shortId });
                    if (!existing) {
                        isUnique = true;
                    }
                }
                attempts++;
            }

            if (!isUnique) {
                return res
                    .status(500)
                    .json(
                        createErrorResponse(
                            "Failed to generate unique short ID. Please try again.",
                            500,
                            "GENERATION_ERROR"
                        )
                    );
            }
        }

        const newUrl = await URL.create({
            shortId,
            redirectedURL: cleanUrl,
            visitHistory: [],
            createdBy: "anonymous",
        });

        return res
            .status(201)
            .json(
                createSuccessResponse(
                    { id: newUrl.shortId, url: cleanUrl },
                    "Short URL created successfully"
                )
            );
    } catch (error) {
        return res
            .status(500)
            .json(
                createErrorResponse(
                    "Internal server error while creating short URL",
                    500,
                    "INTERNAL_ERROR"
                )
            );
    }
}

async function getAnalytics(req, res) {
    try {
        const { shortId } = req.params;

        const validation = validateShortId(shortId);
        if (!validation.isValid) {
            return res
                .status(400)
                .json(
                    createErrorResponse(
                        validation.errors.join(", "),
                        400,
                        "VALIDATION_ERROR",
                        { errors: validation.errors }
                    )
                );
        }

        const cleanShortId = validation.cleanShortId;

        const urlData = await URL.findOne({
            shortId: cleanShortId,
            isActive: true,
        }).select("shortId redirectedURL visitHistory createdAt");

        if (!urlData) {
            return res
                .status(404)
                .json(
                    createErrorResponse(
                        "Short URL not found or has been deactivated",
                        404,
                        "URL_NOT_FOUND"
                    )
                );
        }

        const visitHistory = urlData.visitHistory || [];
        const analytics = {
            shortId: urlData.shortId,
            originalUrl: urlData.redirectedURL,
            totalClicks: visitHistory.length,
            createdAt: urlData.createdAt,
            analytics: visitHistory.map((visit, index) => ({
                visitNumber: index + 1,
                timestamp: visit.timestamp,
                date: new Date(visit.timestamp).toISOString(),
                userAgent: visit.userAgent || null,
                browser: extractBrowserInfo(visit.userAgent),
                device: extractDeviceInfo(visit.userAgent),
                timeAgo: getTimeAgo(visit.timestamp),
            })),
        };

        return res.json(
            createSuccessResponse(analytics, "Analytics retrieved successfully")
        );
    } catch (error) {
        return res
            .status(500)
            .json(
                createErrorResponse(
                    "Internal server error while retrieving analytics",
                    500,
                    "INTERNAL_ERROR"
                )
            );
    }
}

async function redirectToUrl(req, res) {
    try {
        const { shortId } = req.params;

        const validation = validateShortId(shortId);
        if (!validation.isValid) {
            return res.status(400).send("Invalid short URL format");
        }

        const cleanShortId = validation.cleanShortId;

        const urlData = await URL.findOneAndUpdate(
            { shortId: cleanShortId, isActive: true },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                        userAgent: req.get("User-Agent"),
                    },
                },
            },
            { new: true }
        );

        if (!urlData) {
            return res.status(404).send("Short URL not found");
        }

        return res.redirect(urlData.redirectedURL);
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
}

function extractBrowserInfo(userAgent) {
    if (!userAgent) return "Unknown";

    const ua = userAgent.toLowerCase();
    if (ua.includes("chrome/") && !ua.includes("edg/")) {
        const version = userAgent.match(/chrome\/(\d+)/i);
        return `Chrome ${version ? version[1] : ""}`;
    } else if (ua.includes("firefox/")) {
        const version = userAgent.match(/firefox\/(\d+)/i);
        return `Firefox ${version ? version[1] : ""}`;
    } else if (ua.includes("safari/") && !ua.includes("chrome/")) {
        const version = userAgent.match(/version\/(\d+)/i);
        return `Safari ${version ? version[1] : ""}`;
    } else if (ua.includes("edg/")) {
        const version = userAgent.match(/edg\/(\d+)/i);
        return `Edge ${version ? version[1] : ""}`;
    } else if (ua.includes("opera/") || ua.includes("opr/")) {
        return "Opera";
    }
    return "Unknown";
}

function extractDeviceInfo(userAgent) {
    if (!userAgent) return "Unknown";

    const ua = userAgent.toLowerCase();
    let device = "Desktop";
    let os = "Unknown";

    if (
        ua.includes("mobile") ||
        ua.includes("android") ||
        ua.includes("iphone")
    ) {
        device = "Mobile";
    } else if (ua.includes("tablet") || ua.includes("ipad")) {
        device = "Tablet";
    }

    if (ua.includes("windows")) {
        os = "Windows";
    } else if (
        ua.includes("mac") &&
        !ua.includes("iphone") &&
        !ua.includes("ipad")
    ) {
        os = "macOS";
    } else if (ua.includes("linux")) {
        os = "Linux";
    } else if (ua.includes("android")) {
        os = "Android";
    } else if (ua.includes("iphone") || ua.includes("ipad")) {
        os = "iOS";
    }

    return `${device} (${os})`;
}

function getTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    return new Date(timestamp).toLocaleDateString();
}

module.exports = {
    generateNewShortUrl,
    getAnalytics,
    redirectToUrl,
};
