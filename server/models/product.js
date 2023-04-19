'use strict';
const {
  Model
} = require('sequelize');




module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Order , { 
        through: models.OrderedProduct,
        foreignKey: 'productId'
      });

      this.belongsTo(models.Kitchen ,{
        foreignKey: 'kitchenId'
      })
      this.belongsTo(models.ProductCategory ,{
        foreignKey: 'productCategoryId'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    state: DataTypes.STRING,
    productCategoryId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductCategories',
        key: 'id'
      }
    },
    kitchenId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Kitchens',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};