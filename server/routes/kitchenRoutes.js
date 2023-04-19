const express = require('express');
const router = express.Router();
const kitchenController = require('../controller/kitchenController');

router.post('/kitchens', kitchenController.createKitchen);
router.get('/kitchens', kitchenController.getAllKitchens);
router.get('/kitchens/:id', kitchenController.getKitchenById);
router.put('/kitchens/:id', kitchenController.updateKitchen);
router.delete('/kitchens/:id', kitchenController.deleteKitchen);

module.exports = router;