const express = require("express");
const { generateNewShortUrl, getAnalytics } = require("../controllers/urlController");
const { urlCreationLimiter, analyticsLimiter } = require("../middleware/rateLimiter");
const router = express.Router();

router.post("/", urlCreationLimiter, generateNewShortUrl);

router.get("/analytics/:shortId", analyticsLimiter, getAnalytics);

module.exports = router;
