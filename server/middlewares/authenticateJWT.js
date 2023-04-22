const jwt = require('jsonwebtoken');
require('dotenv').config()

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Extract the token from the header
    console.log("server received token : =>" + token)

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

module.exports = { authenticateJWT };

