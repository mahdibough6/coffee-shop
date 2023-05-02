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
      this.hasMany(models.ProductCategory, {
        foreignKey: 'coffeeShopId'
      })
      this.hasMany(models.Table, {
        foreignKey: 'coffeeShopId'
      })
      this.hasMany(models.Product, {
        foreignKey: 'coffeeShopId'
      })
      this.hasOne(models.CoffeeShopConfig, {
        foreignKey: 'coffeeShopId'
      })
      this.belongsTo(models.Client, {
        foreignKey: 'clientId'
      })
      this.hasMany(models.Recipe, {
        foreignKey: 'coffeeShopId'
      })
    }
  }
  CoffeeShop.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    coffeeShopKey: {
      type: DataTypes.STRING,
      unique:true
    },
    clientId: {
      allowNull: false,
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

