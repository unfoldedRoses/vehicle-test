// models/vehicle.js

'use strict';
const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const Vehicle = sequelize.define('Vehicle', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    }, { tableName: 'vehicles' });
  
    Vehicle.associate = (models) => {
      Vehicle.belongsTo(models.VehicleType, { foreignKey: 'type_id' });
      Vehicle.belongsTo(models.VehicleModel, { foreignKey: 'model_id' });
      Vehicle.hasMany(models.Booking, { foreignKey: 'vehicle_id' });
    };
  
    return Vehicle;
  };