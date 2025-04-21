const APIError = require("./../utils/APIError");

const restrictTo = (role) => {
	return (req, res, next) => {
		if (req.user.role !== role) {
			throw new APIError("You are NOT Authorized to access this resource", 403);
		}
		next();
	}
}

// Export
module.exports = restrictTo;