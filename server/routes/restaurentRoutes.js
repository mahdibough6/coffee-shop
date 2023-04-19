const express = require('express');
const router = express.Router();
const restaurentController = require('../controller/restaurentController');

router.post('/restaurents', restaurentController.createRestaurent);
router.get('/restaurents', restaurentController.getAllRestaurents);
router.get('/restaurents/:id', restaurentController.getRestaurentById);
router.put('/restaurents/:id', restaurentController.updateRestaurent);
router.delete('/restaurents/:id', restaurentController.deleteRestaurent);

module.exports = router;
