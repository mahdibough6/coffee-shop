const express = require('express');
const router = express.Router();
const tableController = require('../controller/tableController');

router.post('/tables', tableController.createTable);
router.get('/tables', tableController.getAllTables);
router.get('/tables/:id', tableController.getTableById);
router.put('/tables/:id', tableController.updateTable);
router.delete('/tables/:id', tableController.deleteTable);

module.exports = router;