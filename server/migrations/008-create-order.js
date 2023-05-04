'use strict';

const OrderState = require('../enums/OrderState');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true, // set auto-increment
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      employeeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Employees',
          key: 'id',
        },
      },
      recipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Recipes',
          key: 'id',
        },
      },
      tableId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tables',
          key: 'id',
        },
      },
      coffeeShopId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CoffeeShops',
          key: 'id',
        },
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      state: {
        type: Sequelize.ENUM,
        values: [OrderState.CONFIRMED, OrderState.CANCELED],
        defaultValue: OrderState.CONFIRMED,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      totalPrice: {
        type: Sequelize.DOUBLE, //total price
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
