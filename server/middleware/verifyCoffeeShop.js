const jwt = require('jsonwebtoken');
const {getKey} = require('../controller/CoffeeShopController')
require('dotenv').config()

function verifyCoffeeShop(req, res, next) {
  const cskey = req.headers.cskey;
  const coffeeShopId  = req.params.id;
      if (cskey && cskey == getKey(coffeeShopId)) {
        next();
      }

  else {
    res.sendStatus(401); // Unauthorized
  }
}

module.exports = verifyCoffeeShop;

