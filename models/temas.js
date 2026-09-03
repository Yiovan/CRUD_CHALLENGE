const {pool} = require('./db');

const obtenerTodos = async () => {
    const resultado = await pool.query('SELECT * FROM temas ORDER BY votos DESC');
    return resultado.rows;
};

const crear = async (titulo) => {
    await pool.query('INSERT INTO temas (titulo, votos) VALUES ($1, $2)', [titulo, 0]);
};

const votar = async (id) => {
    await pool.query('UPDATE temas SET votos = votos + 1 WHERE id = $1', [id]);
};

const eliminar = async (id) => {
    await pool.query('DELETE FROM temas WHERE id = $1', [id]);
};

module.exports = { obtenerTodos, crear, votar, eliminar };