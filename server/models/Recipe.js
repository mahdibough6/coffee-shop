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
      
    }
  }
  Recipe.init({
    totalPrice: DataTypes.DOUBLE,
    state: {
        type: DataTypes.STRING,
        defaultValue:'ongoing'
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