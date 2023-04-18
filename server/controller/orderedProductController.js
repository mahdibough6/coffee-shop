const { OrderedProduct } = require('../models');

// Create a new ordered product
exports.createOrderedProduct = async (req, res) => {
  try {
    const orderedProduct = await OrderedProduct.create(req.body);
    res.status(201).json(orderedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ordered products
exports.getAllOrderedProducts = async (req, res) => {
  try {
    const orderedProducts = await OrderedProduct.findAll();
    res.status(200).json(orderedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single ordered product by ID
exports.getOrderedProductById = async (req, res) => {
  try {
    const orderedProduct = await OrderedProduct.findByPk(req.params.id);
    if (orderedProduct) {
      res.status(200).json(orderedProduct);
    } else {
      res.status(404).json({ message: 'Ordered product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an ordered product by ID
exports.updateOrderedProduct = async (req, res) => {
  try {
    const [updatedRows] = await OrderedProduct.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows) {
      const updatedOrderedProduct = await OrderedProduct.findByPk(req.params.id);
      res.status(200).json(updatedOrderedProduct);
    } else {
      res.status(404).json({ message: 'Ordered product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an ordered product by ID
exports.deleteOrderedProduct = async (req, res) => {
  try {
    const deletedRows = await OrderedProduct.destroy({ where: { id: req.params.id } });

    if (deletedRows) {
      res.status(204).json({ message: 'Ordered product deleted' });
    } else {
      res.status(404).json({ message: 'Ordered product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
