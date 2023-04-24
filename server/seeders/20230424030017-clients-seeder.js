'use strict';

/** @type {import('sequelize-cli').Migration} */

const faker = require('faker');


module.exports = {
  async up (queryInterface, Sequelize) {
const fakeClients = [];

    for (let i = 0; i < 100; i++) {
      fakeClients.push({
        username: faker.internet.userName(),
        pwd: faker.internet.password(),
      });
    }

    await queryInterface.bulkInsert('Clients', fakeClients, {});    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};
