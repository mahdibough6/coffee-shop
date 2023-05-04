'use strict';
const {
  Model

} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CoffeeShopConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.CoffeeShop, {
        foreignKey: 'coffeeShopId'
      })
    }
  }
  CoffeeShopConfig.init({
    startHour: DataTypes.TIME,
    isActive:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    } ,
    coffeeShopId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'CoffeeShops',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'CoffeeShopConfig',
  });
  return CoffeeShopConfig;
};