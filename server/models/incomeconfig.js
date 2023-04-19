'use strict';
const {
  Model

} = require('sequelize');

const Restaurent = require('./restaurent')

module.exports = (sequelize, DataTypes) => {
  class IncomeConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Restaurent, {
        foreignKey: 'restaurentId'
      })
    }
  }
  IncomeConfig.init({
    startHour: DataTypes.TIME,
    restaurentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Restaurents',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'IncomeConfig',
  });
  return IncomeConfig;
};