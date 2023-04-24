const express = require('express');
const router = express.Router();
const CoffeeShopController = require('../controllers/CoffeeShopController');
const CoffeeShopConfigsRouter = require('./coffee-shop-configs')
const tablesRouter = require('./tables')
const productsRouter = require('./products')
const productCategoriesRouter = require('./product-categories')
const employeesRouter = require('./employees')

router.get('/', CoffeeShopController.getAll);
router.post('/', CoffeeShopController.create);
router.get('/:id', CoffeeShopController.getById);
router.put('/:id', CoffeeShopController.update);
router.delete('/:id', CoffeeShopController.delete);


router.use('/:coffeeShopId/employees', employeesRouter)
router.use('/:coffeeShopId/product-category', productCategoriesRouter)
router.use('/:coffeeShopId/products', productsRouter)
router.use('/:coffeeShopId/tables', tablesRouter)
router.use('/:coffeeShopId/coffee-shop-configs', CoffeeShopConfigsRouter)

module.exports = router;
