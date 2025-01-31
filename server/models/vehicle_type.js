// models/VehicleType.js

'use strict';
const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const VehicleType = sequelize.define('VehicleType', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Enforce unique type names
      },
    }, { tableName: 'vehicle_types' });
  
    VehicleType.associate = (models) => {
      VehicleType.hasMany(models.Vehicle, { foreignKey: 'type_id' });
    };
  
    return VehicleType;
  };
  