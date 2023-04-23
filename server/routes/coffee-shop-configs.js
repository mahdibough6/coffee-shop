const express = require('express');
const router = express.Router();

const incomeConfigController = require('../controllers/');

router.post('/', incomeConfigController.createIncomeConfig);
router.get('/', incomeConfigController.getAllIncomeConfigs);
router.get('/:id', incomeConfigController.getIncomeConfigById);
router.put('/:id', incomeConfigController.updateIncomeConfig);
router.delete('/:id', incomeConfigController.deleteIncomeConfig);

//TODO add user preferences
module.exports = router;
