const express = require('express');
const EmployeeController = require('../controllers/employee.controller');

const router = express.Router();

router.post('/', EmployeeController.create);
router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);
router.put('/:id', EmployeeController.updateById);
router.delete('/:id', EmployeeController.deleteById);

module.exports = router;
