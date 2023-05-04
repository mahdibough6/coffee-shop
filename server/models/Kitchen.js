'use strict';
const {
  Model
} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Kitchen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, {
        foreignKey: 'kitchenId' 
      })
    }
  }
  Kitchen.init({
    name: {
      type: DataTypes.STRING,
    },
    printer: {
      type: DataTypes.STRING,
    },
    isActive:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    } ,
    coffeeShopId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'CoffeeShops',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Kitchen',
  });
  return Kitchen;
};