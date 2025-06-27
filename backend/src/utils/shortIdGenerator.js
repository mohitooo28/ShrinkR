const { customAlphabet } = require("nanoid");

const alphabet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const generateShortId = (length = 8) => {
    if (length < 4 || length > 12) {
        throw new Error("ID length must be between 4 and 12 characters");
    }

    const customNanoid = customAlphabet(alphabet, length);
    return customNanoid();
};

const isSafeShortId = (shortId) => {
    if (!/^[a-zA-Z0-9]+$/.test(shortId)) {
        return false;
    }

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
        "app",
        "apps",
        "help",
        "support",
        "about",
        "contact",
        "home",
        "index",
        "main",
        "blog",
        "news",
        "docs",
        "doc",
        "legal",
        "terms",
        "privacy",
        "policy",
        "cookie",
        "null",
        "undefined",
        "void",
        "true",
        "false",
        "delete",
        "remove",
        "edit",
        "new",
        "create",
        "update",
        "analytics",
        "stats",
        "data",
        "info",
        "meta",
        "link",
        "url",
        "short",
    ];

    const lowerShortId = shortId.toLowerCase();
    return !reservedWords.includes(lowerShortId);
};

module.exports = {
    generateShortId,
    isSafeShortId,
};
