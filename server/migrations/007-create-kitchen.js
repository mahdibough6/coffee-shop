'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kitchens', {
id: {
  allowNull: false,
  autoIncrement: true, // set auto-increment
  primaryKey: true,
  type: Sequelize.INTEGER
},
      state: {
        type: Sequelize.STRING,
        defaultValue: 'active'
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
    await queryInterface.dropTable('Kitchens');
  }
};
