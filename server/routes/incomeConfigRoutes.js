const express = require('express');
const router = express.Router();
const incomeConfigController = require('../controller/incomeConfigController');

router.post('/income-configs', incomeConfigController.createIncomeConfig);
router.get('/income-configs', incomeConfigController.getAllIncomeConfigs);
router.get('/income-configs/:id', incomeConfigController.getIncomeConfigById);
router.put('/income-configs/:id', incomeConfigController.updateIncomeConfig);
router.delete('/income-configs/:id', incomeConfigController.deleteIncomeConfig);

module.exports = router;
