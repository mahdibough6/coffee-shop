const RecipeState = require('../enums/RecipeState');
const { CoffeeShop } = require('../models');
const { Product,Employee ,Recipe, Order, OrderedProduct } = require('../models');
const {Op} = require('sequelize')

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

exports.getOngoingOrdersSummary = async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await Order.findAll({
      where: {
        coffeeShopId: id,
      },
      include: [
        {
          model: Recipe,
          where: { state: RecipeState.ONGOING },
        },
        {
          model: Product,
          through: OrderedProduct,
        },
      ],
    });

    const productSummary = [];
    let recipeTotalPrice = 0;
    const productMap = {};

    orders.forEach((order) => {
      order.Products.forEach((product) => {
        const productOrdered = product.OrderedProduct;
        if (productMap.hasOwnProperty(product.id)) {
          productMap[product.id].qte += productOrdered.qte;
        } else {
          productMap[product.id] = {
            id: product.id,
            name: product.name,
            qte: productOrdered.qte,
          };
        }
        // Calculate total price for each product
        const totalPrice = product.price * productMap[product.id].qte;
        productMap[product.id].totalPrice = totalPrice;

        // Update the recipe total price
        recipeTotalPrice += product.price * productOrdered.qte;
      });
    });

    // Convert productMap to productSummary array
    for (const productId in productMap) {
      productSummary.push(productMap[productId]);
    }

    return res.status(200).json({ success: true, data: { products: productSummary, recipeTotalPrice } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching the ongoing orders summary' });
  }
};
exports.getFinishedRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, limit, startDate, endDate } = req.query;
    
    // Convert page and limit to integers
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    // Add the date range filter to your database query
    const where = {
      coffeeShopId: id,
      state: 'finished'
    };

    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [startDate, endDate]
      };
    }

    const recipes = await Recipe.findAndCountAll({
      where,
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
      order: [['createdAt', 'DESC']],
      include: [Employee]
    });

    return res.status(200).json({ 
      success: true, 
      recipes: recipes.rows, 
      totalPages: Math.ceil(recipes.count / limitNum) 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching the finished recipes' });
  }
};
