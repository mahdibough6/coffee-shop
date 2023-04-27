'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kitchens', {
      id: {
        allowNull: false,
        defaultValue:  Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      state: {
        type: Sequelize.STRING,
        defaultValue: 'active'
      },
    coffeeShopId: {
        allowNull: false,
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('Kitchens');
  }
};
