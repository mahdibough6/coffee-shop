const { Order, Employee, Table, Product } = require('../models');
// Create a new order
exports.create = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
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
  const {coffeeShopId, recipeId }= req.params;
  try {
    const orders = await Order.findAll({
      where:{
        coffeeShopId,
        recipeId
      }
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
