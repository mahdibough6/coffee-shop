'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
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
      email:{
        allowNull:false,
        type: Sequelize.STRING
      },
      pwd: {
        allowNull:false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Clients');
  }
};