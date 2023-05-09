const express = require('express');
const router = express.Router({mergeParams:true});
const CoffeeShopController = require('../controllers/CoffeeShopController');


router.get('/', CoffeeShopController.getAll);
router.post('/', CoffeeShopController.create);
router.get('/:id', CoffeeShopController.getById);
router.get('/:id/ongoing-orders-summary', CoffeeShopController.getOngoingOrdersSummary);
router.put('/:id', CoffeeShopController.update);
router.delete('/:id', CoffeeShopController.delete);
router.get('/:id/finished-recipes', CoffeeShopController.getFinishedRecipes);


module.exports = router;
