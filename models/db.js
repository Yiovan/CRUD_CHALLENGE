const { Pool } = require('pg')

const pool = new Pool ({
    user: 'admin',
    host: 'localhost',
    database: 'learndb',
    password: 'password123',
    port: 5432,
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