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
// Update a recipe by ID
exports.finishRecipe = async (req, res) => {
  try {
    // Check if the recipe exists
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if the current status is 'ongoing'
    if (recipe.status === 'ongoing') {
      // Update the status to 'finished' and the totalPrice
      const newTotalPrice = req.body.totalPrice; // Get the new totalPrice from the request body
      const [updatedRows] = await Recipe.update(
        { state: 'finished', totalPrice: newTotalPrice },
        { where: { id: req.params.id } }
      );

      if (updatedRows) {
        const updatedRecipe = await Recipe.findByPk(req.params.id);
        res.status(200).json(updatedRecipe);
      } else {
        res.status(500).json({ message: 'Unable to update the recipe' });
      }
    } else {
      res.status(400).json({ message: 'Recipe is not in ongoing status' });
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

exports.latestOngoingRecipe = async (req, res) => {
  const { employeeId, coffeeShopId } = req.params;

  try {
    // Find or create the ongoing recipe
    const [latestOngoingRecipe, created] = await Recipe.findOrCreate({
      where: {
        coffeeShopId,
        employeeId,
        state: 'ongoing',
      },
      defaults: {
        coffeeShopId,
        employeeId,
        totalPrice: 0,
      },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      data: latestOngoingRecipe,
      created,
    });
  } catch (error) {
    console.error('Error fetching or creating latest ongoing recipe:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching or creating the latest ongoing recipe.',
    });
  }
  }

