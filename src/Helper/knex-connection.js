const knex = require('knex');
const config = require('../config/database.config');
const con = knex(config.development);


module.exports = con;
  