const express = require('express');
const router = express.Router();
const ProductCategoryController = require('../controllers/ProductCategoryController');

router.post('/', ProductCategoryController.create);
router.get('/', ProductCategoryController.getAll);
router.get('/coffee-shops/:coffeeShopId', ProductCategoryController.getAllCoffeeShopCategories);
router.get('/:id', ProductCategoryController.getById);
router.put('/:id', ProductCategoryController.update);
router.delete('/:id', ProductCategoryController.delete);

module.exports = router;
