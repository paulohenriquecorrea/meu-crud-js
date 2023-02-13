const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// define o modelo de usuário
const User = sequelize.define('user', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  operador: DataTypes.STRING,
});

module.exports = User;
