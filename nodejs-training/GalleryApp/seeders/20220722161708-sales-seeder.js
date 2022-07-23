'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sales', [
      {
        id: 1,
        user_id: 1,
        product_id: 1,
        sale_date: new Date(),
        qty: 1,
        unit_price: 5.0,
        total: 5.0
      },
      {
        id: 2,
        user_id: 1,
        product_id: 2,
        sale_date: new Date(),
        qty: 2,
        unit_price: 1.0,
        total: 2.0
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
