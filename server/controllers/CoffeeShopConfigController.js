const { CoffeeShopConfig } = require('../models');

// Create a new income config
exports.create = async (req, res) => {
  try {
    const conf = await CoffeeShopConfig.create(req.body);
    res.status(201).json(conf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all income configs
exports.getAll = async (req, res) => {
  try {
    const conf = await CoffeeShopConfig.findAll();
    res.status(200).json(conf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single income config by ID
exports.getById = async (req, res) => {
  try {
    const conf = await CoffeeShopConfig.findByPk(req.params.id);
    if (conf) {
      res.status(200).json(conf);
    } else {
      res.status(404).json({ message: 'Income config not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an income config by ID
exports.update = async (req, res) => {
  try {
    const [updatedRows] = await CoffeeShopConfig.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows) {
      const conf = await CoffeeShopConfig.findByPk(req.params.id);
      res.status(200).json(conf);
    } else {
      res.status(404).json({ message: 'Income config not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an income config by ID
exports.delete = async (req, res) => {
  try {
    const deletedRows = await CoffeeShopConfig.destroy({ where: { id: req.params.id } });

    if (deletedRows) {
      res.status(204).json({ message: 'Income config deleted' });
    } else {
      res.status(404).json({ message: 'Income config not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
