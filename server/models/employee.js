'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      this.belongsTo(models.CoffeeShop, {
        foreignKey: 'coffeeShopId'
      })
      this.hasMany(models.Order, {
        foreignKey: 'employeeId'
      })
    }
  }
  Employee.init({
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    tel: DataTypes.STRING,
    username: DataTypes.STRING,
    pwd: DataTypes.STRING,
    role: DataTypes.STRING,
    printerIp: DataTypes.STRING,
    printerPort: DataTypes.STRING,
    coffeeShopId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'CoffeeShops',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};
