const { AppError } = require("../utils/errors");

function errorHandler(err, req, res, next) {
    const status = err.statusCode || 500;

    res.status(status).json({
        message: err.message || "Internal Server Error",
        ...(err.errors && { errors: err.errors }),
    });
}

module.exports = errorHandler;
