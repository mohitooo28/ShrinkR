const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            minlength: 4,
            maxlength: 12,
            match: /^[a-zA-Z0-9]+$/,
        },
        redirectedURL: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2048,
            validate: {
                validator: function (v) {
                    return /^https?:\/\/.+/.test(v);
                },
                message: "Invalid URL format",
            },
        },
        visitHistory: [
            {
                timestamp: {
                    type: Number,
                    default: Date.now,
                },
                userAgent: {
                    type: String,
                    default: null,
                },
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: String,
            default: "anonymous",
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

urlSchema.virtual("totalClicks").get(function () {
    return this.visitHistory.length;
});

urlSchema.index({ createdAt: -1 });
urlSchema.index({ isActive: 1 });

urlSchema.pre("save", function (next) {
    const reservedWords = [
        "admin",
        "api",
        "www",
        "mail",
        "ftp",
        "test",
        "dev",
        "stage",
        "prod",
        "root",
        "user",
        "login",
        "register",
        "dashboard",
        "settings",
        "config",
        "system",
    ];

    if (reservedWords.includes(this.shortId.toLowerCase())) {
        const error = new Error("Short ID contains reserved word");
        error.statusCode = 400;
        return next(error);
    }

    next();
});

const URL = mongoose.model("URL", urlSchema);
module.exports = URL;
