'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Form.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    number: DataTypes.STRING,
    service: DataTypes.STRING,
    serviceDescription: DataTypes.TEXT,
    otp: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Form',
  });
  return Form;
};