const { Product, ProductCategory } = require('../models');

// Create a new product category
exports.create = async (req, res) => {
  try {
    const productCategory = await ProductCategory.create(req.body);
    res.status(201).json(productCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAll = async (req, res) => {
  try {
    const productCategories = await ProductCategory.findAll();
    res.status(200).json(productCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all product categories for a specific coffee shop
exports.getAllCoffeeShopCategories = async (req, res) => {
  const coffeeShopId = req.params.coffeeShopId;
  try {
    const productCategories = await ProductCategory.findAll({
      where: { coffeeShopId, isActive:true }
    });
    res.status(200).json(productCategories);
  } catch (error) {
  console.log(error)
    res.status(500).json({ error: error.message });
  }
};


// Get a single product category by ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  const coffeeShopId = req.params.coffeeShopId;
  try {
    const productCategory = await ProductCategory.findOne({ where: { id, coffeeShopId } });
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
exports.update = async (req, res) => {
  const id = req.params.id;
  const coffeeShopId = req.params.coffeeShopId;
  try {
    const productCategory = await ProductCategory.findOne({ where: { id, coffeeShopId } });
    if (productCategory) {
      const updatedProductCategory = await productCategory.update(req.body);
      res.status(200).json(updatedProductCategory);
    } else {
      res.status(404).json({ message: 'Product category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product category by ID
exports.delete = async (req, res) => {
  const id = req.params.id;
  const coffeeShopId = req.params.coffeeShopId;
  try {
    const productCategory = await ProductCategory.findOne({ where: { id, coffeeShopId } });
    if (productCategory) {
      await productCategory.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Product category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deactivateProductCategory = async (req, res) => {
  const { productCategoryId, coffeeShopId } = req.params;
  try {
    const productCategory = await ProductCategory.findOne({ where: { id: productCategoryId , coffeeShopId} });
    if (!productCategory) {
      res.status(404).json({ message: 'Product category not found' });
    } else {
      productCategory.status = 'inactive';
      await productCategory.save();
      res.status(200).json({ message: 'Product category deactivated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
