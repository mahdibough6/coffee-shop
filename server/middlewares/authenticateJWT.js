const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Extract the token from the header

    jwt.verify(token, "my secret key", (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user; // Save the user object to the request
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}
module.exports = {authenticateJWT};
