const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const database = {
  client: process.env.DB_NAME,
  version: 14.1,
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
};

// eslint-disable-next-line import/prefer-default-export
module.exports = database;
