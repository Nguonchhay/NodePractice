'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        first_name: 'San',
        last_name: 'Sok',
        email: 'sok@gmail.com',
        password: '12345678'
      },
      {
        id: 2,
        first_name: 'Mey',
        last_name: 'Long',
        email: 'mey@gmail.com',
        password: '12345678'
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
