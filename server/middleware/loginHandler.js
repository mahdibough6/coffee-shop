const db = require('../models');
const Employee = db.Employee;
const CoffeeShop = db.CoffeeShop;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginHandler = async (req, res) => {
  const { coffeeShopId, username, password } = req.body;

  if (!coffeeShopId || !username || !password) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const employee = await Employee.findOne({
      where: { username, coffeeShopId },
    });

    if (!employee || employee.pwd !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const employeeId = employee.id;
    const employeeRole = employee.role;
    const payload = { employeeId, employeeRole };
    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Login failed' });
  }
};

module.exports = loginHandler;
