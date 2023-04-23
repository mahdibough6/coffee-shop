const express = require('express');
const EmployeeController = require('../controller/employeeController');

const router = express.Router();

router.post('/employees', EmployeeController.create);
router.get('/employees', EmployeeController.create);
router.get('/employees', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);
router.put('/:id', EmployeeController.updateById);
router.delete('/:id', EmployeeController.deleteById);

module.exports = router;
