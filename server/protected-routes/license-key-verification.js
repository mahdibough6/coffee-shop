const express = require('express');
const router = express.Router();
const { CoffeeShop } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { coffeeShopKey } = req.body;
    const coffeeShop = await CoffeeShop.findOne({
      where: { coffeeShopKey }
      
    });
    if (coffeeShop) {
      res.status(200).json({ coffeeShopId: coffeeShop.id });
    } else {
      throw new Error('Invalid key');
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid key' });
  }
});

module.exports = router;
