const db = require('../models');
const Employee = db.Employee;
const CaffeeShop = db.caffeeShop;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginHandler = async (req, res) => {
  const { caffeeShopToken, username, password } = req.body;

  if (!caffeeShopToken || !username || !password) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const caffeeShop = await CaffeeShop.findOne({ where: { key: caffeeShopToken } });
    const caffeeShopId = caffeeShop ? caffeeShop.id : null;

    const employee = await Employee.findOne({ username, caffeeShopId });

    if (!employee || employee.pwd !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ empoyee: employee }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: '1h',
    });

    res.json({ token, employee });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};

module.exports = loginHandler;
