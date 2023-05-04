'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
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
      isActive:{
        type:Sequelize.BOOLEAN,
        defaultValue:true,
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