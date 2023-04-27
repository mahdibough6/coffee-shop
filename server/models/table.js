'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    static associate(models) {
      this.hasMany(models.Order);
      this.belongsTo(models.CoffeeShop,{
        foreignKey: 'coffeeShopId'
      })
    }
  }

  Table.init({
    name: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
    coffeeShopId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'CoffeeShops',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Table',
  });

  return Table;
};