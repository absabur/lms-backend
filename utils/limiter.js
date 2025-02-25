const rateLimit = require('express-rate-limit');

exports.createLimiterAuth = () =>
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // 15 requests per route
    message: {
      success: false,
      error: "Too many requests, please try again later.",
    },
  });
