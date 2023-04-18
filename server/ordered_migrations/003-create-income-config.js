'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('IncomeConfigs', {
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
      restaurentId:{
        type: Sequelize.INTEGER,
        references: {
          model:'Restaurents',
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
    await queryInterface.dropTable('IncomeConfigs');
  }
};