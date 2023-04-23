const { CoffeeShop } = require('../models');

// Create a new restaurent
exports.create = async (req, res) => {
  try {
    const cs = await CoffeeShop.create(req.body);
    res.status(201).json(cs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all restaurents
exports.getAll = async (req, res) => {
  try {
    const cs = await CoffeeShop.findAll();
    res.status(200).json(cs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single restaurent by ID
exports.getById = async (req, res) => {
  try {
    const cs = await CoffeeShop.findByPk(req.params.id);
    if (restaurent) {
      res.status(200).json(cs);
    } else {
      res.status(404).json({ message: 'Restaurent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a restaurent by ID
exports.update = async (req, res) => {
  try {
    const [updatedRows] = await CoffeeShop.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows) {
      const newCs = await CoffeeShop.findByPk(req.params.id);
      res.status(200).json(newCs);
    } else {
      res.status(404).json({ message: 'Restaurent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a restaurent by ID
exports.delete = async (req, res) => {
  try {
    const deletedRows = await CoffeeShop.destroy({ where: { id: req.params.id } });

    if (deletedRows) {
      res.status(204).json({ message: 'Restaurent deleted' });
    } else {
      res.status(404).json({ message: 'Restaurent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getKey = async(coffeeShopId) =>{
  return await CoffeeShop.findOne({
    where:{
      id: coffeeShopId
    }
  }).key
}