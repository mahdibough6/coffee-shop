const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Route to check if JWT is valid
router.post('/check-authentication', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    // If the token is valid, return a 200 OK response
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
});

module.exports = router;

