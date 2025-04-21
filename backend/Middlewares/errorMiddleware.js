const APIError = require("../utils/APIError");

const errorMiddleware = (err, req, res, next) => { 
    console.error(err.stack);

    if (err.name === "CastError") {
        res.status(400).json({ message: "Invalid ID" })
    };
    if (err.name === "ValidationError") {
        res.status(400).json({ message: "Invalid Data" })
    };
    if (err.code === 11000) {
        res.status(400).json({ message: "Duplicate Key" })
    };
    if (err instanceof APIError) {
        res.status(err.statusCode).json({ message: err.message })
    };
    if (err.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Unauthorized" })
    };
    res.status(500).json({
        message: "Unexpected Error",
        error: err.message
    });
};

// Export
module.exports = errorMiddleware;