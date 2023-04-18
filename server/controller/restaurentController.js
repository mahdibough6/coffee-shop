const { Restaurent } = require('../models');

// Create a new restaurent
exports.createRestaurent = async (req, res) => {
  try {
    const restaurent = await Restaurent.create(req.body);
    res.status(201).json(restaurent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all restaurents
exports.getAllRestaurents = async (req, res) => {
  try {
    const restaurents = await Restaurent.findAll();
    res.status(200).json(restaurents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single restaurent by ID
exports.getRestaurentById = async (req, res) => {
  try {
    const restaurent = await Restaurent.findByPk(req.params.id);
    if (restaurent) {
      res.status(200).json(restaurent);
    } else {
      res.status(404).json({ message: 'Restaurent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a restaurent by ID
exports.updateRestaurent = async (req, res) => {
  try {
    const [updatedRows] = await Restaurent.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows) {
      const updatedRestaurent = await Restaurent.findByPk(req.params.id);
      res.status(200).json(updatedRestaurent);
    } else {
      res.status(404).json({ message: 'Restaurent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a restaurent by ID
exports.deleteRestaurent = async (req, res) => {
  try {
    const deletedRows = await Restaurent.destroy({ where: { id: req.params.id } });

    if (deletedRows) {
      res.status(204).json({ message: 'Restaurent deleted' });
    } else {
      res.status(404).json({ message: 'Restaurent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
