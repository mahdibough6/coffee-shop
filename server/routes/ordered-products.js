const express = require('express');
const router = express.Router();

const OrderedProductController = require('../controllers/OrderedProductController');

router.post('/', OrderedProductController.create);
router.get('/', OrderedProductController.getAll);
router.get('/:id', OrderedProductController.create);
router.put('/:id', OrderedProductController.update);
router.delete('/:id', OrderedProductController.delete);

module.exports = router;
