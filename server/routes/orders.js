const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.post('/', OrderController.create);
router.post('/order-reference', OrderController.createOrderReference);
router.get('/coffee-shops/:coffeeShopId/recipes/:recipeId/', OrderController.getRecipeOrders);
router.get('/coffee-shops/:coffeeShopId/ongoing', OrderController.getOngoingOrders);
router.get('/:id', OrderController.getById);
router.put('/:id', OrderController.update);
router.get('/:orderId/ordered-products', OrderController.getOrderedProductsByOrderId);
router.delete('/:id', OrderController.delete);
router.put(
    '/coffee-shops/:coffeeShopId/orders/:orderId/cancel-order',
    OrderController.cancelOrder
  );
  
module.exports = router;
