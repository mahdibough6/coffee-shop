'use strict';
const {
  Model
} = require('sequelize');
const OrderState = require('../enums/OrderState');



module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

    static associate(models) {
      // define association here
      this.belongsToMany(models.Product , { 
        through: models.OrderedProduct,
        foreignKey: 'orderId'
        
      });
      this.belongsTo(models.Recipe, {
        foreignKey: 'recipeId' 
      })
      this.belongsTo(models.Table, {
        foreignKey: 'tableId' 
      })
      this.belongsTo(models.Employee, {
        foreignKey: 'employeeId' 
      })
    }
  }
  Order.init({
    state: {
      type: DataTypes.ENUM,
      values: [OrderState.CANCELED, OrderState.CONFIRMED],
      defaultValue: OrderState.CONFIRMED // can be ether canceled or proceeded
    },
    ref:{
      type: DataTypes.INTEGER,
      defaultValue: 0 // can be ether canceled or proceeded
    },
    isPaid:{
      type: DataTypes.BOOLEAN,
      defaultValue: false // can be ether canceled or proceeded
    },
    totalPrice: {
      type: DataTypes.DOUBLE //total price
    },
    isActive:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    } ,
    tableId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Tables',
        key: 'id'
      }
    },
    employeeId:{
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Employees',
        key: 'id'
      }
    },
    recipeId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes',
        key: 'id'
      }
    },
    coffeeShopId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'CoffeeShops',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};