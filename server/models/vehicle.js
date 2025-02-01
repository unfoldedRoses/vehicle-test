'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Vehicle extends Model {
    static associate(models) {
      Vehicle.belongsTo(models.VehicleType, { foreignKey: 'type_id', as: 'vehicleType' });
      Vehicle.belongsTo(models.VehicleModel, { foreignKey: 'model_id', as: 'vehicleModel' });
      Vehicle.hasMany(models.Booking, { foreignKey: 'vehicle_id' });
    }
  }
  Vehicle.init({
    available: DataTypes.BOOLEAN,
    type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'vehicle_types', 
        key: 'id'
      }
    },
    model_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'vehicle_models', 
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Vehicle',
    tableName: 'vehicles' , 
    timestamps: false,  
  });
  return Vehicle;
};