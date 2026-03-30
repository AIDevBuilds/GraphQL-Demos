'use strict';
const faker = require('faker')

const bitcoins = [...Array(100)].map((bitcoins) => ({
  name: faker.finance.currencyName(),
  symbol: faker.finance.currencyCode(),
  price: faker.finance.amount(),
  imageUrl: "https://picsum.photos/200/200",
  favorite: false,
  createdAt: new Date(),
  updatedAt: new Date
}))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bitcoins', bitcoins)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
