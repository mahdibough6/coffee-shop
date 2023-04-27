const { Recipe } = require('../models');

// Create a new recipe
exports.create = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all recipes
exports.getAll = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single recipe by ID
exports.getById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a recipe by ID
exports.update = async (req, res) => {
  try {
    const [updatedRows] = await Recipe.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows) {
      const updatedRecipe = await Recipe.findByPk(req.params.id);
      res.status(200).json(updatedRecipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a recipe by ID
exports.delete = async (req, res) => {
  try {
    const deletedRows = await Recipe.destroy({ where: { id: req.params.id } });

    if (deletedRows) {
      res.status(204).json({ message: 'Recipe deleted' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




