const express = require('express');
const router = express.Router();
const { Employee } = require('../models');

router.post('/pos-employees', async (req, res) => {
  const { coffeeShopId } = req.body;
  try {
    const employees = await Employee.findAll({
      where: { coffeeShopId },
      attributes: ['id','username', 'role'],
    });
    res.status(200).json( employees );
  }catch (error) {
      console.error('Error fetching employees:', error);
      if (error instanceof Sequelize.EmptyResultError) {
        res.status(404).json({ error: 'No employees found for the given coffee shop ID.' });
      } else {
        res.status(500).json({ error: 'An error occurred while fetching employees.' });
      }
    }
    
});

module.exports = router;
