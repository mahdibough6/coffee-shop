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

exports.getByCatAndCoffeeShopId = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        productCategoryId: req.params.productCategoryId,
        coffeeShopId: req.params.coffeeShopId,
        isActive:true
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.log('Error retrieving products by category:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getByCoffeeShopId = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        coffeeShopId: req.params.coffeeShopId
      }
    });
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'No products found for this coffee shop' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deactivateProduct = async (req, res) => {
  const { productId, coffeeShopId } = req.body;
  try {
    const product = await Product.findOne({ where: { id: productId, coffeeShopId } });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      product.state = 'inactive';
      await product.save();
      res.status(200).json({ message: 'Product deactivated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.activateProduct = async (req, res) => {
  const { productId, coffeeShopId } = req.body;
  try {
    const product = await Product.findOne({ where: { id: productId, coffeeShopId } });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      product.state = 'active';
      await product.save();
      res.status(200).json({ message: 'Product activated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getWithPagination = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default limit is 10 items
  const offset = parseInt(req.query.offset) || 0; // Default offset is 0
  const coffeeShopId = req.query.coffeeShopId;

  try {
    const products = await Product.findAll({
      limit,
      offset,
      where: {
        isActive: true,
        coffeeShopId,
      },
      include: {
        model: ProductCategory,
        attributes: ['name'],
      },
      attributes: ['id', 'name', 'price'],
      // Add any other options you need, like sorting
    });

    const productsWithCategoryName = products.map(product => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.ProductCategory.name,
      };
    });

    res.status(200).json({ products: productsWithCategoryName });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
};
