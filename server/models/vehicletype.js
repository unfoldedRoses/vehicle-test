'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class VehicleType extends Model {
    static associate(models) {
      VehicleType.hasMany(models.Vehicle, { foreignKey: 'type_id', as: 'vehicles' });
    }
  }
  VehicleType.init({
    type_name: DataTypes.STRING,
    wheels: {  // <--- Add the wheels property here
      type: DataTypes.INTEGER, // Or DataTypes.SMALLINT
      allowNull: true,        // Or allowNull: false if it's always required
      defaultValue: null       // Important: Add a default value (or set it in your database)
  },
  }, {
    sequelize,
    modelName: 'VehicleType',
    tableName: 'vehicle_types',  
    timestamps: false,  
    
  });
  return VehicleType;
};