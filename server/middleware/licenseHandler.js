const db = require('../models');
const Employee = db.Employee;
const CaffeeShop = db.caffeeShop;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const licenseHandler = async (req, res) => {
  const { caffeeShopToken } = req.body;

  if (!caffeeShopToken) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const caffeeShop = await CaffeeShop.findOne({ where: { key: caffeeShopToken } });
    const caffeeShopId = caffeeShop ? caffeeShop.id : null;

    const employees = await Employee.findAll({ where: { caffeeShopId } });

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
