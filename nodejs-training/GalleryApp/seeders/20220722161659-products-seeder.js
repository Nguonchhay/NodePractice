'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        id: 1,
        category_id: 1,
        name: "Dutch Milk",
        unit_price: 4.5,
        image_url: "https://",
        description: "",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        category_id: 2,
        name: "Darsany",
        unit_price: 0.5,
        image_url: "https://",
        description: "",
        created_at: new Date(),
        updated_at: new Date()
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
