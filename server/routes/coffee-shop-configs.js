const express = require('express');
const router = express.Router();

const CoffeeShopController = require('../controllers/CoffeeShopConfigController');

router.post('/', CoffeeShopController.create);
router.get('/', CoffeeShopController.getAll);
router.get('/:id', CoffeeShopController.getById);
router.put('/', CoffeeShopController.update);
router.delete('/:id', CoffeeShopController.delete);

//TODO add user preferences
module.exports = router;
