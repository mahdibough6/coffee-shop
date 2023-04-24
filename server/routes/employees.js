const express = require('express');
const EmployeeController = require('../controllers/EmployeeController');

const router = express.Router({mergeParams:true});

router.post('/', EmployeeController.create);
router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);

module.exports = router;
