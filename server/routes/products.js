const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.getAll);
router.get('/coffee-shops/:coffeeShopId/product-categories/:productCategoryId', ProductController.getByCatAndCoffeeShopId);
router.get('/coffee-shops/:coffeeShopId', ProductController.getByCoffeeShopId);
router.post('/', ProductController.create);
router.post('/desactivate', ProductController.deactivateProduct);
router.get('/:id', ProductController.getById);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);


module.exports = router;
