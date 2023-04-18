const express = require('express');
const router = express.Router();
const orderedProductController = require('./controllers/orderedProductController');

router.post('/orderedProducts', orderedProductController.createOrderedProduct);
router.get('/orderedProducts', orderedProductController.getAllOrderedProducts);
router.get('/orderedProducts/:id', orderedProductController.getOrderedProductById);
router.put('/orderedProducts/:id', orderedProductController.updateOrderedProduct);
router.delete('/orderedProducts/:id', orderedProductController.deleteOrderedProduct);

module.exports = router;
