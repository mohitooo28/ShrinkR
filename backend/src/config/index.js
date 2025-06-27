require("dotenv").config();

const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,

    mongodbUrl: process.env.MONGODB_URL,

    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS),

    allowedOrigins: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : undefined,

    allowedIPs: process.env.ALLOWED_IPS
        ? process.env.ALLOWED_IPS.split(",")
        : undefined,

    security: {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    "https://cdn.tailwindcss.com",
                ],
                scriptSrc: ["'self'", "https://cdn.tailwindcss.com"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'"],
                fontSrc: ["'self'"],
                objectSrc: ["'none'"],
                mediaSrc: ["'self'"],
                frameSrc: ["'none'"],
            },
        },
    },
};

module.exports = config;
