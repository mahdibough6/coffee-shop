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
    username: DataTypes.STRING,
    pwd: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};
