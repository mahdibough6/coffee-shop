const { Client } = require('../models');

// Create a new client
exports.create = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all clients
exports.getAll = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single client by ID
exports.getById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a client by ID
exports.update = async (req, res) => {
  try {
    const [updatedRows] = await Client.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows) {
      const updatedClient = await Client.findByPk(req.params.id);
      res.status(200).json(updatedClient);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a client by ID
exports.delete = async (req, res) => {
  try {
    const deletedRows = await Client.destroy({ where: { id: req.params.id } });

    if (deletedRows) {
      res.status(204).json({ message: 'Client deleted' });
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};