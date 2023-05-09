const { OrderedProduct, Order , Product} = require('../models');

// Create a new ordered product
exports.create = async (req, res) => {
  try {
    const orderedProduct = await OrderedProduct.create(req.body);
    res.status(201).json(orderedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ordered products
exports.getAll = async (req, res) => {
  try {
    const orderedProducts = await OrderedProduct.findAll();
    res.status(200).json(orderedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single ordered product by ID
exports.getById = async (req, res) => {
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
exports.update = async (req, res) => {
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
exports.delete = async (req, res) => {
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

exports.getOrderedProductsSummary = async (req, res) => {
  try {
    const {recipeId, coffeeShopId} = req.params;

    const orders = await Order.findAll({
      where: {
        recipeId,
        coffeeShopId,
        isActive: true
      },
      include: {
        model: Product,
        through: {
          model: OrderedProduct,
          attributes: ['qte']
        }
      }
    });

    const productSummary = {};
    let totalPrice = 0;

    orders.forEach(order => {
      order.Products.forEach(product => {
        const qte = product.OrderedProduct.qte;
        const productTotalPrice = product.price * qte;
        totalPrice += productTotalPrice;
        
        if (productSummary[product.id]) {
          productSummary[product.id].qte += qte;
          productSummary[product.id].totalPrice += productTotalPrice;
        } else {
          productSummary[product.id] = {
            id: product.id,
            name: product.name,
            qte: qte,
            totalPrice: productTotalPrice
          };
        }
      });
    });

    res.status(200).json({
      success: true,
      data: {
        products: Object.values(productSummary),
        recipeTotalPrice: totalPrice
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching ordered products summary'
    });
  }
};