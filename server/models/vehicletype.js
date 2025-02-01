'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class VehicleType extends Model {
    static associate(models) {
      VehicleType.hasMany(models.Vehicle, { foreignKey: 'type_id', as: 'vehicles' });
    }
  }
  VehicleType.init({
    type_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VehicleType',
    tableName: 'vehicle_types',  
    timestamps: false,  
    
  });
  return VehicleType;
};