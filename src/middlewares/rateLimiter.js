const rateLimit = require('express-rate-limit');

const requestLimiter = (maxLimit) => {
  return rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: maxLimit || 10,
  });
}

module.exports = {
  requestLimiter,
};
