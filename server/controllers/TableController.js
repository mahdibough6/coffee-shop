const db = require('../models');
const Table = db.Table;

const TableController = {
  // create table
  async create(req, res) {
    try {
      const table = await Table.create(req.body);
      res.status(201).json({ table });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // get all tables
  async getAll(req, res) {
    const coffeeShopId = req.params.coffeeShopId;
    try {
      const tables = await Table.findAll({where: { coffeeShopId }});
      res.status(200).json({ tables, isActive:true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // get table by id
  async getById(req, res) {
    const id = req.parmas.id;
    const coffeeShopId = req.parmas.coffeeShopId;
    try {
      const table = await Table.findOne({ where : { id, coffeeShopId } });
      if (table) {
        res.status(200).json({ table });
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // update table by id
  async update(req, res) {
    const id = req.parmas.id;
    const coffeeShopId = req.parmas.coffeeShopId;
    try {
      const table = await Table.findOne({ where : { id, coffeeShopId } });
      if (table) {
        const updatedEmployee = await table.update(req.body);
        res.status(200).json({ table: updatedEmployee });
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // delete table by id
  async delete(req, res) {
    const id = req.parmas.id;
    const coffeeShopId = req.parmas.coffeeShopId;
    try {
      const table = await Table.findOne({ where : { id, coffeeShopId } });
      if (table) {
        await table.destroy();
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

module.exports = TableController;