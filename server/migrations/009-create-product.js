'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
id: {
  allowNull: false,
  autoIncrement: true, // set auto-increment
  primaryKey: true,
  type: Sequelize.INTEGER
},
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      state: {
        defaultValue:'active',
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      kitchenId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Kitchens',
          key: 'id'
        }
      },
      productCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ProductCategories',
          key: 'id'
        }
      },
      coffeeShopId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'CoffeeShops',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};