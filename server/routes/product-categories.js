const express = require('express');
const router = express.Router();
const productCategoryController = require('../controller/productCategoryController');

router.post('/productCategories', productCategoryController.createProductCategory);
router.get('/productCategories', productCategoryController.getAllProductCategories);
router.get('/productCategories/:id', productCategoryController.getProductCategoryById);
router.put('/productCategories/:id', productCategoryController.updateProductCategory);
router.delete('/productCategories/:id', productCategoryController.deleteProductCategory);

module.exports = router;
