const db = require('../models');
const ProductCategory = db.ProductCategory;

const ProductCategoryController = {
  // create productCategory
  async create(req, res) {
    try {
      const productCategory = await Employee.create(req.body);
      res.status(201).json({ productCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // get all productCategorys
  async getAll(req, res) {
    const coffeeShopId = req.params.coffeeShopId;
    try {
      const productCategorys = await Employee.findAll({where: { coffeeShopId }});
      res.status(200).json({ productCategorys });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // get productCategory by id
  async getById(req, res) {
    const id = req.parmas.id;
    const coffeeShopId = req.parmas.coffeeShopId;
    try {
      const productCategory = await Employee.findOne({ where : { id, coffeeShopId } });
      if (productCategory) {
        res.status(200).json({ productCategory });
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // update productCategory by id
  async update(req, res) {
    const id = req.parmas.id;
    const coffeeShopId = req.parmas.coffeeShopId;
    try {
      const productCategory = await Employee.findOne({ where : { id, coffeeShopId } });
      if (productCategory) {
        const updatedEmployee = await productCategory.update(req.body);
        res.status(200).json({ productCategory: updatedEmployee });
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // delete productCategory by id
  async delete(req, res) {
    const id = req.parmas.id;
    const coffeeShopId = req.parmas.coffeeShopId;
    try {
      const productCategory = await Employee.findOne({ where : { id, coffeeShopId } });
      if (productCategory) {
        await productCategory.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = ProductCategoryController;