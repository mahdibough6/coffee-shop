'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Restaurent extends Model {
    static associate(models) {
      this.hasMany(models.Employee, {
        foreignKey: 'restaurentId'
      })
      this.hasOne(models.IncomeConfig, {
        foreignKey: 'restaurentId'
      })
      this.belongsTo(models.Client, {
        foreignKey: 'clientId'
      })
    }
  }
  Restaurent.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Restaurent',
  });
  return Restaurent;
};