const RecipeState = require('../enums/RecipeState');
const { Order, Employee, Table, Product,Recipe } = require('../models');
// Create a new order

const { OrderedProduct, ProductCategory } = require('../models');
exports.create = async (req, res) => {
  try {
    const lastOrder = await Order.findOne({ order: [['createdAt', 'DESC']] });
    const referenceOffset = req.body.referenceOffset || 1; // Use reference offset from request or set to 1
    const reference = lastOrder ? lastOrder.ref + referenceOffset : 0;
    
    // Remove referenceOffset from the request body to avoid adding it as a field in the Order model
    const { referenceOffset: _, ...newOrderData } = req.body;
    newOrderData.ref = reference;

    const order = await Order.create(newOrderData);
    res.status(201).json(order);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
  }
};
exports.createOrderReference = async (req, res) => {
  try {
    
    // Remove referenceOffset from the request body to avoid adding it as a field in the Order model

    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
  }
};

// Get all orders
exports.getAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [Employee, Table, Product],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecipeOrders = async (req, res) => {
  const { coffeeShopId, recipeId } = req.params;
  try {
    const orders = await Order.findAll({
      where: {
        coffeeShopId,
        recipeId,
        isActive: true
      },
      order: [['id', 'DESC']]
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single order by ID
exports.getById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [Employee, Table, Product],
    });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.cancelOrder = async (req, res) => {
  console.log(req.params)
  try {
    const [updatedRows] = await Order.update(
      { state: 'canceled' },
      {
        where: { id: req.params.orderId, coffeeShopId: req.params.coffeeShopId },
      }
    );

    if (updatedRows) {
      const updatedOrder = await Order.findByPk(req.params.orderId);
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an order by ID
exports.update = async (req, res) => {
  try {
    const [updatedRows] = await Order.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows) {
      const updatedOrder = await Order.findByPk(req.params.id, {
        include: [Employee, Table, Product],
      });
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an order by ID
exports.delete = async (req, res) => {
  try {
    const deletedRows = await Order.destroy({ where: { id: req.params.id } });

    if (deletedRows) {
      res.status(204).json({ message: 'Order deleted' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get the most recent not paid order 

exports.getMostRecentNotPaidOrder = async (req, res) => {
  const tableId = req.query.tableId;
  const employeeId = req.query.employeeId;

  if (!tableId || !employeeId) {
    return res.status(400).send({ message: 'Both tableId and employeeId are required.' });
  }

  try {
    const order = await Order.findOne({
      where: {
        tableId: tableId,
        employeeId: employeeId,
        state: 'NOT_PAID'
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Table,
          required: true,
        },
        {
          model: Employee,
          required: true,
        },
      ],
    });

    if (!order) {
      return res.status(404).send({ message: 'No NOT_PAID orders found for the specified table and employee.' });
    }

    res.status(200).send(order.toJSON());
  } catch (error) {
    console.error('Error fetching the most recent NOT_PAID order:', error);
    res.status(500).send({ message: 'An error occurred while fetching the most recent NOT_PAID order.' });
  }
}

exports.getOrderedProductsByOrderId = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    
    const order = await Order.findByPk(orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    const orderedProducts = await order.getProducts({
      attributes: ['id', 'name', 'price'],
      through: {
        attributes: ['qte'],
      },
      include: [
        {
          model: ProductCategory,
          attributes: ['name'],
        },
      ],
    });

    const formattedOrderedProducts = orderedProducts.map((product) => {
      const { qte } = product.OrderedProduct;
      const { id, name, price, ProductCategory } = product;
      const { name: categoryName } = ProductCategory;

      return {
        id,
        name,
        categoryName,
        qte,
        price: qte * price,
      };
    });

    // Sort the array in descending order based on the 'id' property
    formattedOrderedProducts.sort((a, b) => b.id - a.id);

    res.status(200).json(formattedOrderedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the ordered products.' });
  }
};


// to get all the orders belongs to recipes that are on ongoing state;
//TODO check this later i think its wrong
exports.getOngoingOrders = async (req, res) => {
  try {
    const ongoingOrders = await Order.findAll({
      include: [
        {
          model: Recipe,
          where: { state:RecipeState.ONGOING, isActive:true },
        },
      ],
      where:{isActive:true}
    });

    res.status(200).json( ongoingOrders);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching ongoing orders.',
      error: error.message,
    });
  }
}
