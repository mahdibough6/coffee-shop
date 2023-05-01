const express = require('express');
const router = express.Router({mergeParams:true});
const CoffeeShopController = require('../controllers/CoffeeShopController');


router.get('/', CoffeeShopController.getAll);
router.post('/', CoffeeShopController.create);
router.get('/:id', CoffeeShopController.getById);
router.put('/:id', CoffeeShopController.update);
router.delete('/:id', CoffeeShopController.delete);


module.exports = router;
