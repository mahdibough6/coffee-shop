const express = require('express');
const router = express.Router();
const { Employee } = require('../models');
const verifyCoffeeShopKey = require('../middleware/verifyCoffeeShop');

router.post('/employees', verifyCoffeeShopKey, async (req, res) => {
    console.log("----------------------------------------------")
    console.log("key recieved !")
    console.log("----------------------------------------------")
  try {
    const employees = await Employee.findAll({
      where: { coffeeShopId: req.coffeeShopId },
    });
    res.status(200).json(employees);
    console.log(employees)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
