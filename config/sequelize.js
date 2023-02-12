// import Sequelize from 'sequelize'; - forma de importar como módulo ES6 (ES6 module)
const Sequelize = require('sequelize');
const database = require('./config'); // importação com require

const sequelize = new Sequelize(database);

module.exports = sequelize;
