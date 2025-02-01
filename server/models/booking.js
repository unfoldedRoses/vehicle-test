'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'user_id' });
      Booking.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id' });
    }
  }
  Booking.init({
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    booking_status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',  
        key: 'id'
      }
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vehicles',  
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings',
     timestamps: false
  });
  return Booking;
};