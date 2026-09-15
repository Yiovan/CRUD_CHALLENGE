const { Pool } = require('pg') // extrae la clase pool
require('dotenv').config()

const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})


const inicializarDB = async ()=> {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS temas (
            id SERIAL PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            votos INTEGER DEFAULT 0
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS enlaces (
            id SERIAL PRIMARY KEY,
            tema_id INTEGER REFERENCES temas(id) on DELETE CASCADE,
            url VARCHAR(255) NOT NULL,
            votos INTEGER DEFAULT 0
        );
    `);
        console.log("base de datos conectada y tablas listas")
}

module.exports = { pool, inicializarDB };