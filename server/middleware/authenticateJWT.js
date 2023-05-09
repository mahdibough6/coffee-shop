const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const [bearer, token] = authorization.split(' ');

    if (bearer === 'Bearer' && token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        next();
      } catch (err) {
        res.sendStatus(403); // Forbidden
      }
    } else {
      res.sendStatus(401); // Unauthorized
    }
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = { authenticateJWT };

