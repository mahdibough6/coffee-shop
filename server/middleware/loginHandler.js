const db = require('../models');
const Employee = db.Employee;
const CoffeeShop = db.CoffeeShop;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginHandler = async (req, res) => {

  console.log(req.body)
  console.log("resquset body"+req.body)
  const { coffeeShopKey, username, password } = req.body;

  if (!coffeeShopKey || !username || !password) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const coffeeShop = await CoffeeShop.findOne({ where: {  coffeeShopKey } });
    const coffeeShopId = coffeeShop ? coffeeShop.id : null;

    const employee = await Employee.findOne({ username, coffeeShopId });

    if (!employee || employee.pwd !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ empoyee: employee }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};

module.exports = loginHandler;
