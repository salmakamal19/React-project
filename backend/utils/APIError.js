class APIError extends Error {
    constructor(message, statusCode) {
        super(message);                 // constructor for the parent class
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}
// Export
module.exports = APIError;
