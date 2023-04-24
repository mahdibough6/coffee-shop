const express = require('express');
const router = express.Router();
const TableController = require('../controllers/TableController');

router.post('/', TableController.create);
router.get('/', TableController.getAll);
router.get('/:id', TableController.getById);
router.put('/:id', TableController.update);
router.delete('/:id', TableController.delete);

module.exports = router;