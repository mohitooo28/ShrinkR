const helmet = require("helmet");
const cors = require("cors");
const config = require("../config");

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (config.allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
};

const helmetConfig = {
    contentSecurityPolicy:
        config.nodeEnv === "production"
            ? config.security.contentSecurityPolicy
            : false,
    crossOriginEmbedderPolicy: false,
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    },
};

const validateRequest = (req, res, next) => {
    const userAgent = req.get("User-Agent") || "";

    if (!userAgent && config.nodeEnv === "production") {
        return res.status(400).json({
            error: {
                message: "Invalid request",
                code: "INVALID_REQUEST",
            },
        });
    }

    if (req.method === "POST" && req.get("Content-Length")) {
        const contentLength = parseInt(req.get("Content-Length"));
        if (contentLength > 10 * 1024 * 1024) {
            return res.status(413).json({
                error: {
                    message: "Request entity too large",
                    code: "ENTITY_TOO_LARGE",
                },
            });
        }
    }

    next();
};

const checkIPWhitelist = (req, res, next) => {
    // Skip IP check for health endpoint in development
    if (req.path === "/health" && config.nodeEnv !== "production") {
        return next();
    }

    // Skip IP checking if no IPs are configured (for Vercel compatibility)
    if (!config.allowedIPs || config.allowedIPs.length === 0) {
        console.log(
            `[IP-SKIP] No IP whitelist configured, relying on CORS protection`
        );
        return next();
    }

    const clientIP =
        req.ip ||
        req.connection?.remoteAddress ||
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.headers["x-real-ip"] ||
        "unknown";

    const normalizedIP = clientIP.startsWith("::ffff:")
        ? clientIP.substring(7)
        : clientIP;
    const finalIP = normalizedIP === "::1" ? "127.0.0.1" : normalizedIP;

    const isAllowed = config.allowedIPs.some((allowedIP) => {
        return finalIP === allowedIP || clientIP === allowedIP;
    });

    if (!isAllowed) {
        console.warn(
            `[IP-BLOCKED] ${new Date().toISOString()} - Blocked IP: ${finalIP} from ${
                req.method
            } ${req.path}`
        );
        return res.status(403).json({
            error: {
                message: "Access forbidden: IP address not authorized",
                code: "IP_NOT_AUTHORIZED",
            },
        });
    }

    next();
};

const sanitizeRequest = (req, res, next) => {
    const sanitizeObject = (obj) => {
        if (typeof obj === "string") {
            return obj.replace(/\x00/g, "");
        }
        if (Array.isArray(obj)) {
            return obj.map(sanitizeObject);
        }
        if (obj && typeof obj === "object") {
            const sanitized = {};
            for (const [key, value] of Object.entries(obj)) {
                sanitized[key] = sanitizeObject(value);
            }
            return sanitized;
        }
        return obj;
    };

    if (req.body) {
        req.body = sanitizeObject(req.body);
    }
    if (req.query) {
        req.query = sanitizeObject(req.query);
    }

    next();
};

const handleCorsError = (err, req, res, next) => {
    if (err.message === "Not allowed by CORS") {
        return res.status(403).json({
            error: "Access forbidden: Origin not allowed",
        });
    }
    next(err);
};

module.exports = {
    cors: cors(corsOptions),
    helmet: helmet(helmetConfig),
    handleCorsError,
    validateRequest,
    sanitizeRequest,
    checkIPWhitelist,
};
