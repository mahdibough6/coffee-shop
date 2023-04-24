const express = require('express');
const router = express.Router();
const { Employee } = require('../models');
const jwt = require('jsonwebtoken');


router.post('/employee', async (req, res) => {
  const { username, password } = req.body;

  try {
    const employee = await Employee.findOne({ where: { username : username } });

    if (!employee || employee.pwd !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ empoyee:employee }, process.env.JWT_PRIVATE_KEY , {
      expiresIn: '1h',
    });

    res.json({ token, employee });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
});

module.exports = router;


