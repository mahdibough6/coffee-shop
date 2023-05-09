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
exports.getValue = async (req, res) => {
  try {
    // Destructure the key and coffeeShopId from the request query
    const { key, coffeeShopId } = req.body;

    // Check if the key and coffeeShopId are provided
    if (!key || !coffeeShopId) {
      return res.status(400).json({ message: 'Key and coffeeShopId are required' });
    }

    const conf = await CoffeeShopConfig.findOne({
      where: {  key , coffeeShopId },
      attributes: [value], // Return only the specified key
    });

    if (conf) {
      res.status(200).json({ data :conf});
    } else {
      res.status(404).json({ message: 'Config not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an income config by ID
exports.update = async (req, res) => {
  try {
    // Destructure the key, value, and coffeeShopId from the request body
    const { key, value, coffeeShopId } = req.body;

    // Check if the key, value, and coffeeShopId are provided
    if (!key || value === undefined || !coffeeShopId) {
      return res.status(400).json({ message: 'Key, value, and coffeeShopId are required' });
    }

    const [updatedRows] = await CoffeeShopConfig.update({ value }, {
      where: { coffeeShopId , key },
    });

    if (updatedRows) {
      const conf = await CoffeeShopConfig.findOne({where: {coffeeShopId, key}});
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
