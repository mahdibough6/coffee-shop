const { Table } = require('../models');

// Create a new table
exports.create = async (req, res) => {
  try {
    const table = await Table.create(req.body);
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tables
exports.getAll = async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single table by ID
exports.getById = async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);
    if (table) {
      res.status(200).json(table);
    } else {
      res.status(404).json({ message: 'Table not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a table by ID
exports.update = async (req, res) => {
  try {
    const [updatedRows] = await Table.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows) {
      const updatedTable = await Table.findByPk(req.params.id);
      res.status(200).json(updatedTable);
    } else {
      res.status(404).json({ message: 'Table not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a table by ID
exports.delete = async (req, res) => {
  try {
    const deletedRows = await Table.destroy({ where: { id: req.params.id } });

    if (deletedRows) {
      res.status(204).json({ message: 'Table deleted' });
    } else {
      res.status(404).json({ message: 'Table not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
