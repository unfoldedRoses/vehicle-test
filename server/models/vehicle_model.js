// models/VehicleModel.js

'use strict';
const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const VehicleModel = sequelize.define('VehicleModel', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      model_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, { tableName: 'vehicle_models' });
  
    VehicleModel.associate = (models) => {
      VehicleModel.hasMany(models.Vehicle, { foreignKey: 'model_id' });
    };
  
    return VehicleModel;
  };