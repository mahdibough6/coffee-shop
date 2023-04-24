const db = require('../models');
const ProductCategory = db.ProductCategory;

const ProductCategoryController = {
  // create employee
  async create(req, res) {
    try {
      const employee = await ProductCategory.create(req.body);
      res.status(201).json({ employee });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // get all employees
  async getAll(req, res) {
    const coffeeShopId = req.params.coffeeShopId;
    try {
      const employees = await ProductCategory.findAll({where: { coffeeShopId }});
      res.status(200).json({ employees });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // get employee by id
  async getById(req, res) {
    const id = req.parmas.id;
    const coffeeShopId = req.parmas.coffeeShopId;
    try {
      const employee = await ProductCategory.findOne({ where : { id, coffeeShopId } });
      if (employee) {
        res.status(200).json({ employee });
      } else {
        res.status(404).json({ message: 'ProductCategory not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // update employee by id
  async update(req, res) {
    const id = req.parmas.id;
    const coffeeShopId = req.parmas.coffeeShopId;
    try {
      const employee = await ProductCategory.findOne({ where : { id, coffeeShopId } });
      if (employee) {
        const updatedProductCategory = await employee.update(req.body);
        res.status(200).json({ employee: updatedProductCategory });
      } else {
        res.status(404).json({ message: 'ProductCategory not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // delete employee by id
  async delete(req, res) {
    const id = req.parmas.id;
    const coffeeShopId = req.parmas.coffeeShopId;
    try {
      const employee = await ProductCategory.findOne({ where : { id, coffeeShopId } });
      if (employee) {
        await employee.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ message: 'ProductCategory not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = ProductCategoryController;
