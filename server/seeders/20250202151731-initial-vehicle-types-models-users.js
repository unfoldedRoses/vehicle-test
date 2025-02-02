'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('vehicle_types', [
      { type_name: 'Hatchback', wheels: 4 },
      { type_name: 'Sedan', wheels: 4 },
      { type_name: 'SUV', wheels: 4 },
      { type_name: 'Motorcycle', wheels: 2 },
      { type_name: 'Cruiser', wheels: 2 },
      { type_name: 'Sports', wheels: 2 },
    ], {});

    await queryInterface.bulkInsert('vehicle_models', [
      { model_name: 'Maruti Swift', type_id: 1 },
      { model_name: 'Hyundai i10', type_id: 1 },
      { model_name: 'Honda City', type_id: 2 },
      { model_name: 'Toyota Fortuner', type_id: 3 },
      { model_name: 'Royal Enfield Classic 350', type_id: 4 },
      { model_name: 'Harley-Davidson Sportster', type_id: 5 },
      { model_name: 'Ducati Panigale', type_id: 6 },
    ], {});

    await queryInterface.bulkInsert('users', [
      { first_name: 'John', last_name: 'Doe' },
      { first_name: 'Jane', last_name: 'Smith' },
      { first_name: 'Alice', last_name: 'Johnson' },
      { first_name: 'Bob', last_name: 'Williams' },
    ], {});

    await queryInterface.bulkInsert('vehicles', [
      { available: true, type_id: 1, model_id: 1 },
      { available: true, type_id: 1, model_id: 2 },
      { available: true, type_id: 2, model_id: 3 },
      { available: true, type_id: 3, model_id: 4 },
      { available: true, type_id: 4, model_id: 5 },
      { available: true, type_id: 5, model_id: 6 },
      { available: true, type_id: 6, model_id: 7 },
    ], {});

    await queryInterface.bulkInsert('bookings', [
        { start_date: '2024-08-01 10:00:00+00', end_date: '2024-08-05 10:00:00+00', booking_status: 'pending', user_id: 1, vehicle_id: 1},
        { start_date: '2024-08-10 10:00:00+00', end_date: '2024-08-12 10:00:00+00', booking_status: 'confirmed', user_id: 2, vehicle_id: 3},
        { start_date: '2024-09-01 10:00:00+00', end_date: '2024-09-03 10:00:00+00', booking_status: 'cancelled', user_id: 3, vehicle_id: 5},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bookings', null, {});
    await queryInterface.bulkDelete('vehicles', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('vehicle_models', null, {});
    await queryInterface.bulkDelete('vehicle_types', null, {});
  }
};