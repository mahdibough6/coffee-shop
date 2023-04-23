'use strict';
const {
  Model
} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Product , { 
        through: models.OrderedProduct,
        foreignKey: 'orderId'
        
      });
      this.belongsTo(models.Table, {
        foreignKey: 'tableId' 
      })
      this.belongsTo(models.Employee, {
        foreignKey: 'employeeId' 
      })
    }
  }
  Order.init({
    state: DataTypes.STRING,
    totalPrice: {
      type: DataTypes.DOUBLE //total price
    },
    tableId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Tables',
        key: 'id'
      }
    },
    employeeId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Employees',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};