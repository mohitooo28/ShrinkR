const rateLimit = require('express-rate-limit');
const config = require('../config');

const createRateLimit = (windowMs, max, message) => {
    return rateLimit({
        windowMs,
        max,
        message: {
            error: message,
            retryAfter: Math.ceil(windowMs / 1000)
        },
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            res.status(429).json({
                error: message,
                retryAfter: Math.ceil(windowMs / 1000)
            });
        }
    });
};

const generalLimiter = createRateLimit(
    config.rateLimitWindowMs,
    config.rateLimitMaxRequests,
    'Too many requests from this IP, please try again later.'
);

const urlCreationLimiter = createRateLimit(
    15 * 60 * 1000, 
    20, 
    'Too many URLs created from this IP, please try again later.'
);

const analyticsLimiter = createRateLimit(
    5 * 60 * 1000, 
    50, 
    'Too many analytics requests from this IP, please try again later.'
);

module.exports = {
    generalLimiter,
    urlCreationLimiter,
    analyticsLimiter
};
