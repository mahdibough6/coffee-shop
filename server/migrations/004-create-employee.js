'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
id: {
  allowNull: false,
  autoIncrement: true, // set auto-increment
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
        allowNull:false,
        type: Sequelize.STRING
      },
      username: {
        allowNull:false,
        type: Sequelize.STRING
      },
      email: {
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
      printer: {
        type: Sequelize.STRING,
      },
      coffeeShopId: {
        allowNull:false,
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