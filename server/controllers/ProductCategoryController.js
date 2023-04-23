const { ProductCategory } = require('../models');

// Create a new product category
exports.createProductCategory = async (req, res) => {
  try {
    const productCategory = await ProductCategory.create(req.body);
    res.status(201).json(productCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all product categories
exports.getAllProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategory.findAll();
    res.status(200).json(productCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single product category by ID
exports.getProductCategoryById = async (req, res) => {
  try {
    const productCategory = await ProductCategory.findByPk(req.params.id);
    if (productCategory) {
      res.status(200).json(productCategory);
    } else {
      res.status(404).json({ message: 'Product category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product category by ID
exports.updateProductCategory = async (req, res) => {
  try {
    const [updatedRows] = await ProductCategory.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows) {
      const updatedProductCategory = await ProductCategory.findByPk(req.params.id);
      res.status(200).json(updatedProductCategory);
    } else {
      res.status(404).json({ message: 'Product category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product category by ID
exports.deleteProductCategory = async (req, res) => {
  try {
    const deletedRows = await ProductCategory.destroy({ where: { id: req.params.id } });

    if (deletedRows) {
      res.status(204).json({ message: 'Product category deleted' });
    } else {
      res.status(404).json({ message: 'Product category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
