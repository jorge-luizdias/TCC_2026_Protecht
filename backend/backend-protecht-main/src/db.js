const path = require('node:path');
const knex = require('knex');
const config = require('../knexfile');

const environment = process.env.NODE_ENV === 'test' ? 'test' : 'development';
const knexConfig = config[environment];
if (environment !== 'test') {
  knexConfig.connection.filename = path.resolve(process.cwd(), knexConfig.connection.filename);
}

module.exports = knex(knexConfig);
