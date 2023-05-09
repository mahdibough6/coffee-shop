'use strict';

const OrderState = require('../enums/OrderState');
const OrdredProductState = require('../enums/OrderedProductState');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderedProducts', {
      id: {
        allowNull: false,
        autoIncrement: true, // set auto-increment
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      qte: {
        defaultValue: 1,
        type: Sequelize.INTEGER,
      },
      state: {
        type: Sequelize.ENUM,
        values: [OrdredProductState.CANCELED, OrdredProductState.CONFIRMED],
        defaultValue: OrdredProductState.CONFIRMED
      },
      isActive:{
        type:Sequelize.BOOLEAN,
        defaultValue:true,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
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
    await queryInterface.dropTable('OrderedProducts');
  },
};
