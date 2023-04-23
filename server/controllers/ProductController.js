const { Product, ProductCategory } = require('../models');

// Create a new product
exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products
exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single product by ID
exports.getById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by ID
exports.update = async (req, res) => {
  try {
    const [updatedRows] = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product by ID
exports.delete = async (req, res) => {
  try {
    const deletedRows = await Product.destroy({ where: { id: req.params.id } });

    if (deletedRows) {
      res.status(204).json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByCat = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: ProductCategory,
        where: { id: req.params.id },
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.log('Error retrieving products by category:', error.message);
    res.status(500).json({ error: error.message });
  }
};
