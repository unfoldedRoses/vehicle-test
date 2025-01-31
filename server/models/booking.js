// models/booking.js

'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Booking = sequelize.define('Booking', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      booking_status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
    }, { tableName: 'bookings' });
  
    Booking.associate = (models) => {
      Booking.belongsTo(models.User, { foreignKey: 'user_id' });
      Booking.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id' });
    };
  
    return Booking;
  };