const { IncomeConfig } = require('../models');

// Create a new income config
exports.createIncomeConfig = async (req, res) => {
  try {
    const incomeConfig = await IncomeConfig.create(req.body);
    res.status(201).json(incomeConfig);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all income configs
exports.getAllIncomeConfigs = async (req, res) => {
  try {
    const incomeConfigs = await IncomeConfig.findAll();
    res.status(200).json(incomeConfigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single income config by ID
exports.getIncomeConfigById = async (req, res) => {
  try {
    const incomeConfig = await IncomeConfig.findByPk(req.params.id);
    if (incomeConfig) {
      res.status(200).json(incomeConfig);
    } else {
      res.status(404).json({ message: 'Income config not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an income config by ID
exports.updateIncomeConfig = async (req, res) => {
  try {
    const [updatedRows] = await IncomeConfig.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows) {
      const updatedIncomeConfig = await IncomeConfig.findByPk(req.params.id);
      res.status(200).json(updatedIncomeConfig);
    } else {
      res.status(404).json({ message: 'Income config not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an income config by ID
exports.deleteIncomeConfig = async (req, res) => {
  try {
    const deletedRows = await IncomeConfig.destroy({ where: { id: req.params.id } });

    if (deletedRows) {
      res.status(204).json({ message: 'Income config deleted' });
    } else {
      res.status(404).json({ message: 'Income config not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
