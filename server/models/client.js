'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      this.hasOne(models.CoffeeShop, {
        foreignKey: 'clientId'
      })
    }
  }
  Client.init({
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    tel: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    pwd: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};
