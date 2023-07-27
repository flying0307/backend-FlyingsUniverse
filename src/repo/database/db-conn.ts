import Knex from 'knex';

// Database setup
export const DbConn = Knex({
  client: 'pg',
  connection: {
    //port: parseInt(process.env.DB_PORT, 10),
    host: process.env.INSTANCE_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  searchPath: ['knex', 'public'],
});