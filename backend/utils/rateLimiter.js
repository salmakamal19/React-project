const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,	// 15 minutes by millisecond
	limit: 100,					// Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false,		// Disable the `X-RateLimit-*` headers.
								// store: ... , // Redis, Memcached, etc. See below.
	handler: (req, res) => {
		res.status(429).json({
			message: "Too many requests, please try again later."
		})
	}
});

// Export
module.exports = limiter;