const express = require('express');
const router = express.Router();
const CoffeeShopController = require('../controller/CoffeeShopController');

router.get('/', CoffeeShopController.getAll);
router.post('/', CoffeeShopController.create);
router.get('/:id', CoffeeShopController.getById);
router.put('/:id', CoffeeShopController.update);
router.delete('/:id', CoffeeShopController.destroy);

module.exports = router;
