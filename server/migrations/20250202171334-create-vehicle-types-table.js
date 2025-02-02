'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('vehicle_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type_name: {
        type: Sequelize.STRING,
        allowNull: false, // Or true, depending on your requirements
      },
      wheels: {
        type: Sequelize.INTEGER,
        allowNull: true, // Or false, depending on your requirements
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('vehicle_types');
  }
};