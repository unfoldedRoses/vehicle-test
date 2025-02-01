'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Booking, { foreignKey: 'user_id' });
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
   
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',  
    timestamps: false,  
  });
  return User;
};