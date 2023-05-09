'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CoffeeShops', {
id: {
  allowNull: false,
  autoIncrement: true, // set auto-increment
  primaryKey: true,
  type: Sequelize.INTEGER
},
      coffeeShopkey: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      isActive:{
        type:Sequelize.BOOLEAN,
        defaultValue:true,
      },
      clientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
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
    await queryInterface.dropTable('CoffeeShops');
  }
};