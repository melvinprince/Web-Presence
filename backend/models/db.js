require('dotenv').config();
// console.log(process.env);

const pgp = require('pg-promise')();

const connectionString = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

const db = pgp(connectionString);

module.exports = db;