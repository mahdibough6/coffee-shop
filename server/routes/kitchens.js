const express = require('express');
const router = express.Router();
const KitchenController = require('../controllers/KitchenController');

router.post('/', KitchenController.create);
router.get('/', KitchenController.getAll);
router.get('/products/:productId/', KitchenController.getProductKitchen);
router.get('/:id', KitchenController.getById);
router.put('/:id', KitchenController.update);
router.delete('/:id', KitchenController.delete);

module.exports = router;
