const { Kitchen, Product } = require('../models');

// Create a new kitchen appliance
exports.create = async (req, res) => {
  try {
    const kitchen = await Kitchen.create(req.body);
    res.status(201).json(kitchen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all kitchen appliances
exports.getAll = async (req, res) => {
  try {
    const kitchens = await Kitchen.findAll();
    res.status(200).json(kitchens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single kitchen appliance by ID
exports.getById = async (req, res) => {
  try {
    const kitchen = await Kitchen.findByPk(req.params.id);
    if (kitchen) {
      res.status(200).json(kitchen);
    } else {
      res.status(404).json({ message: 'Kitchen appliance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getProductKitchen = async (req, res) => {
  const productId = req.params.productId;
  try {

    const product = await Product.findOne({where:{id:productId}});
    const kitchenId = product.kitchenId;
    const kitchen = await Kitchen.findByPk(kitchenId);

    if (kitchen) {
      res.status(200).json(kitchen);
    } else {
      res.status(404).json({ message: 'Kitchen appliance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a kitchen appliance by ID
exports.update = async (req, res) => {
  try {
    const [updatedRows] = await Kitchen.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows) {
      const updatedKitchen = await Kitchen.findByPk(req.params.id);
      res.status(200).json(updatedKitchen);
    } else {
      res.status(404).json({ message: 'Kitchen appliance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a kitchen appliance by ID
exports.delete = async (req, res) => {
  try {
    const deletedRows = await Kitchen.destroy({ where: { id: req.params.id } });

    if (deletedRows) {
      res.status(204).json({ message: 'Kitchen appliance deleted' });
    } else {
      res.status(404).json({ message: 'Kitchen appliance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};