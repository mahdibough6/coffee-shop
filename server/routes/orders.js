const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.post('/', OrderController.create);
router.get('/', OrderController.getAll);
router.get('/:id', OrderController.getById);
router.put('/:id', OrderController.update);
router.delete('/:id', OrderController.delete);

module.exports = router;
