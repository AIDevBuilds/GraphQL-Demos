'use strict';
const { fake } = require('faker');
const faker = require('faker')

const prompts = [...Array(100)].map((prompt) => (
  {
    title: faker.hacker.phrase(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

console.log(JSON.stringify(prompts))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Prompts', prompts, {})
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
