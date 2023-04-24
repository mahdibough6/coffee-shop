const db = require('../models');
const Employee = db.Employee;
const CoffeeShop = db.CoffeeShop;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const licenseHandler = async (req, res) => {
  const { coffeeShopToken } = req.body;

  if (!coffeeShopToken) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const coffeeShop = await CoffeeShop.findOne({ where: { key: coffeeShopToken } });
    const coffeeShopId = coffeeShop ? coffeeShop.id : null;

    const employees = await Employee.findAll({ where: { coffeeShopId } });

    if (!employees || employees.length === 0) {
      return res.status(401).json({ error: 'No employees found' });
    }

    const usernames = employees.map(employee => employee.username);
    const ids = employees.map(employee => employee.id);

    res.json({ usernames, ids });
  } catch (error) {
    res.status(400).json({ error: 'Error getting employee usernames' });
  }
};

module.exports = licenseHandler;
