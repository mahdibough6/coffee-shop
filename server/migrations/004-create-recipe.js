'use strict';

const RecipeState = require("../enums/RecipeState");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      totalPrice: {
        type: Sequelize.DOUBLE
      },
      state: {
        type: Sequelize.ENUM,
        values: [RecipeState.FINISHED,RecipeState.ONGOING],
        defaultValue: RecipeState.ONGOING
      },
      coffeeShopId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'CoffeeShops',
          key: 'id'
        },
      },
      isActive:{
        type:Sequelize.BOOLEAN,
        defaultValue:true,
      },
      employeeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
