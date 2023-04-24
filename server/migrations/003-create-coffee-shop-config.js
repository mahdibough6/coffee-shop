'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CoffeeShopConfig', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startHour: {
        type: Sequelize.TIME,
        defaultValue:'05:00:00',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      coffeeShopId:{
        type: Sequelize.INTEGER,
        references: {
          model:'CoffeeShops',
          key:'id'
        }
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CoffeeShopConfig');
  }
};