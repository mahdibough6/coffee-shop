const { CoffeeShop } = require('../models');

require('dotenv').config()

const verifyCoffeeShopKey = async (req, res, next) => {
  console.log("-----------------------------------------------")
  console.log("from the middleware")
  console.log("-----------------------------------------------")
  const { coffeeShopKey } = req.body;
  
  const coffeeShop = await CoffeeShop.findOne({ where: { coffeeShopKey } });

  if (coffeeShop) {
    req.coffeeShopId = coffeeShop.id;
    next();
  } else {

  console.log("-----------------------------------------------")
  console.log("authorization problem")
  console.log("-----------------------------------------------")
    res.status(401).json({ error: 'Invalid key' });
  }
};


module.exports = verifyCoffeeShopKey;

