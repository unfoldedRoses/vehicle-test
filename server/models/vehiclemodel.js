'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class VehicleModel extends Model {
    static associate(models) {
      VehicleModel.hasMany(models.Vehicle, { foreignKey: 'model_id', as: 'vehicles' });
    }
  }
  VehicleModel.init({
    model_name: DataTypes.STRING,
    type_id : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'VehicleModel',
    tableName: 'vehicle_models' ,  
    timestamps: false,  
  });
  return VehicleModel;
};