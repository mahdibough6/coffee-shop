'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      totalPrice: {
        type: Sequelize.DOUBLE
      },
      state: {
        type: Sequelize.STRING,
        defaultValue: 'ongoing'
      },
      employeeId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Employees',
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
    await queryInterface.dropTable('Recipes');
  }
};
