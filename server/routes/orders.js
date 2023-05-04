const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.post('/', OrderController.create);
router.get('/coffee-shops/:coffeeShopId/recipes/:recipeId/', OrderController.getRecipeOrders);
router.get('/:id', OrderController.getById);
router.put('/:id', OrderController.update);
router.delete('/:id', OrderController.delete);
router.put(
    '/coffee-shops/:coffeeShopId/orders/:orderId/cancel-order',
    OrderController.cancelOrder
  );
  
module.exports = router;
