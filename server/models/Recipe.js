'use strict';
const {
  Model
} = require('sequelize');




module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {

    static associate(models) {

      this.hasMany(models.Order ,{
        foreignKey: 'kitchenId'
      })
      this.belongsTo(models.Employee, {
        foreignKey:'employeeId'
      })
      this.belongsTo(models.CoffeeShop, {
        foreignKey:'coffeeShopId'
      })
      
    }
  }
  Recipe.init({
    totalPrice: DataTypes.DOUBLE,
    state: {
        type: DataTypes.STRING,
        defaultValue:'ongoing'
    },
    coffeeShopId: {
      allowNull:false,
      type: DataTypes.INTEGER,
      references: {
        model: 'CoffeeShops',
        key: 'id'
      }
    },
    employeeId: {
      allowNull:false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Employees',
        key: 'id'
      }
    }

  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};