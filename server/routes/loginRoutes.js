const express = require('express');
const router = express.Router();
const { Employee } = require('../models');
const jwt = require('jsonwebtoken');

console.log("employee model : ", Employee)

router.post('/employee', async (req, res) => {
  const { username, password } = req.body;

  try {
    const employee = await Employee.findOne({ where: { username: username} });

    console.log('employee:', employee);

    if (!employee || employee.pwd !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ empoyeeId: employee.id }, "my secret key", {
      expiresIn: '11h',
    });

    res.json({ token, employee });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
});

module.exports = router;
