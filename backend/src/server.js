const express = require("express");
require("dotenv").config();

const config = require("./config/index.js");
const connectToMongoDB = require("./config/database.js");

const {
    cors,
    helmet,
    handleCorsError,
    validateRequest,
    sanitizeRequest,
    checkIPWhitelist,
} = require("./middleware/security.js");
const { generalLimiter } = require("./middleware/rateLimiter.js");
const { errorHandler, notFoundHandler } = require("./utils/responseHandler.js");

const urlRoutes = require("./routes/urlRoutes.js");
const { redirectToUrl } = require("./controllers/urlController.js");

const app = express();

app.set("trust proxy", 1);

app.use(helmet);
app.use(cors);
app.use(handleCorsError);

app.use(checkIPWhitelist);
app.use(validateRequest);
app.use(sanitizeRequest);

app.use(generalLimiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

connectToMongoDB(config.mongodbUrl)
    .then(() => console.log(`✅ Server ready to handle requests`))
    .catch((e) => {
        console.error(`❌ Failed to start server:`, e.message);
        process.exit(1);
    });

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.nodeEnv,
    });
});

app.use("/url", urlRoutes);

app.get("/:shortId", redirectToUrl);

app.use(notFoundHandler);
app.use(errorHandler);

process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    process.exit(0);
});

process.on("SIGINT", () => {
    console.log("SIGINT received. Shutting down gracefully...");
    process.exit(0);
});

app.listen(config.port, () => {
    console.log(`🚀 ShrinkR server running on port ${config.port}`);
    console.log(`🌍 Environment: ${config.nodeEnv}`);
    console.log(`📊 Health check: http://localhost:${config.port}/health`);
});

module.exports = app;
