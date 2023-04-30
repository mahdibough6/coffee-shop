const express = require('express');
const router = express.Router();
const { Client, CoffeeShop } = require('../models');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await Client.findOne({ where: { username : username } });
    const coffeeShopId = await CoffeeShop.findOne({ where: { clientId:client.id } });

    if (!client || client.pwd !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ client }, process.env.JWT_PRIVATE_KEY , {
      expiresIn: '1h',
    });

    res.json({ token, client, coffeeShopId });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Login failed' });
  }
});

module.exports = router;
