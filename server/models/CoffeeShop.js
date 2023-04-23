'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CoffeeShop extends Model {
    static associate(models) {
      this.hasMany(models.Employee, {
        foreignKey: 'coffeeShopId'
      })
      this.hasOne(models.CoffeeShopConfig, {
        foreignKey: 'coffeeShopId'
      })
      this.belongsTo(models.Client, {
        foreignKey: 'clientId'
      })
    }
  }
  CoffeeShop.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    key: {
      type: DataTypes.STRING,
      unique:true
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'CoffeeShop',

  });
  return CoffeeShop;
};

