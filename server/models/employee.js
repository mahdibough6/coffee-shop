'use strict';
const {
  Model
} = require('sequelize');
const EmployeeRole = require('../enums/EmployeeRole');


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
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    pwd: DataTypes.STRING,
    role: {
        type: DataTypes.ENUM,
        values: [EmployeeRole.MANAGER, EmployeeRole.STAFF],
    },
    printer: DataTypes.STRING,
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
    modelName: 'Employee',
  });
  return Employee;
};
