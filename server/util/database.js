const { Sequelize } = require('sequelize');
const { Pool } = require('pg');
const { USER, PGHOST, DATABASE, DB_PORT, BIT_DB_PW, CONNECTION_STRING } = process.env

// creates a connection pool to the bit.io database
const pool = new Pool({
    user: USER,
    host: PGHOST,
    database: DATABASE,
    password: BIT_DB_PW, 
    port: DB_PORT,
    ssl: true,
});

//create a Sequelize instance using the connection pool
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
        }
    },
    pool,
    define: {
        timestamps: false
    }
});

module.exports = {
    sequelize
};