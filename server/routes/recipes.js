const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/RecipeController');


router.post('/', RecipeController.create);
router.get('/', RecipeController.getAll);
router.get('/finished', RecipeController.getFinishedRecipes);

router.get('/coffee-shops/:coffeeShopId/employees/:employeeId/latest-recipe', RecipeController.latestOngoingRecipe);
router.get('/:id', RecipeController.getById);
router.get('/:id', RecipeController.getById);
router.put('/:id', RecipeController.update);
router.put('/:id/coffee-shops/:coffeeShopId/finish-recipe', RecipeController.finishRecipe);
router.delete('/:id', RecipeController.delete);


module.exports = router;