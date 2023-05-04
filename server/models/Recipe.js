'use strict';
const { Model } = require('sequelize');
const RecipeState = require('../enums/RecipeState');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      this.hasMany(models.Order, {
        foreignKey: 'recipeId',
      });
      this.belongsTo(models.Employee, {
        foreignKey: 'employeeId',
      });
      this.belongsTo(models.CoffeeShop, {
        foreignKey: 'coffeeShopId',
      });
    }
  }
  Recipe.init(
    {
      totalPrice: DataTypes.DOUBLE,
      state: {
        type: DataTypes.ENUM,
        values: [RecipeState.ONGOING, RecipeState.FINISHED],
        defaultValue: RecipeState.ONGOING, 
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      coffeeShopId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CoffeeShops',
          key: 'id',
        },
      },
      employeeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Employees',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Recipe',
    }
  );
  return Recipe;
};
