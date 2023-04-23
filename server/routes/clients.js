const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');

router.get('/', ClientController.getAll);
router.post('/', ClientController.create);
router.get('/:id', ClientController.getById);
router.put('/:id', ClientController.update);
router.delete('/:id', ClientController.delete);

module.exports = router;