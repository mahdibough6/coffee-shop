'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
id: {
  allowNull: false,
  autoIncrement: true, // set auto-increment
  primaryKey: true,
  type: Sequelize.INTEGER
},
      employeeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Employees',
          key: 'id'
        },
      },
      tableId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tables',
          key: 'id'
        },
      },
      state: {
         type:Sequelize.STRING, defaultValue:'unpaid' //card , cashKeeper, paied (if all the proudcts in this order are paid)
      },
      totalPrice: {
        type: Sequelize.DOUBLE //total price
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
    await queryInterface.dropTable('Orders');
  }
};
