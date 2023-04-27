'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CoffeeShopConfig', {
      id: {
        allowNull: false,
        defaultValue:  Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      coffeeShopId:{
        allowNull: false,
        type: Sequelize.UUID,
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