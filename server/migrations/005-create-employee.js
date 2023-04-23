'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first: {
        type: Sequelize.STRING
      },
      last: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      pwd: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      printerIp: {
        type: Sequelize.STRING
      },
      printerPort: {
        type: Sequelize.STRING
      },
      coffeeShopId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CoffeeShops',
          key: 'id'
        }
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
    await queryInterface.dropTable('Empoyees');
  }
};