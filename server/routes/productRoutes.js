const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

router.get('/products/category/:id', productController.getProductByCat);

module.exports = router;
