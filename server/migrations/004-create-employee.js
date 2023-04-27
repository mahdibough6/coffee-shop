'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        defaultValue:  Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      first: {
        type: Sequelize.STRING
      },
      last: {
        type: Sequelize.STRING
      },
      tel: {
        allowNull:false,
        type: Sequelize.STRING
      },
      username: {
        allowNull:false,
        type: Sequelize.STRING
      },
      pwd: {
        allowNull:false,
        type: Sequelize.STRING
      },
      role: {
        allowNull:false,
        type: Sequelize.STRING
      },
      printerIp: {
        type: Sequelize.STRING
      },
      printerPort: {
        type: Sequelize.STRING
      },
      coffeeShopId: {
        allowNull:false,
        type: Sequelize.UUID,
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