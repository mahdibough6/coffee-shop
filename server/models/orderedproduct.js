'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class OrderedProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderedProduct.init({
    qte: DataTypes.INTEGER,
    state: DataTypes.STRING,
    orderId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Orders',
        key:'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Products',
        key:'id'
      }
    },
  }, {
    sequelize,
    modelName: 'OrderedProduct',
  });
  return OrderedProduct;
};