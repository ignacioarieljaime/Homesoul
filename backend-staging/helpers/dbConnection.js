const Sequelize = require('sequelize');
const sequelizeConfig = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const config = sequelizeConfig[env];


const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;