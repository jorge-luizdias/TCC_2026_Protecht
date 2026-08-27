const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const databaseFile = process.env.DATABASE_FILE || './data/database.sqlite';
if (databaseFile !== ':memory:') fs.mkdirSync(path.dirname(path.resolve(databaseFile)), { recursive: true });

module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: { filename: databaseFile },
    useNullAsDefault: true,
    migrations: { directory: './src/db/migrations' },
    seeds: { directory: './src/db/seeds' }
  },
  test: {
    client: 'better-sqlite3',
    connection: { filename: ':memory:' },
    useNullAsDefault: true,
    migrations: { directory: './src/db/migrations' },
    seeds: { directory: './src/db/seeds' }
  }
};
