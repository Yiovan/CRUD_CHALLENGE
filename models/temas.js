const {pool} = require('./db');

const obtenerTodos = async () => {
    const resultadoTemas = await pool.query('SELECT * FROM temas ORDER BY votos DESC');
    const temas = resultadoTemas.rows;

    for (let tema of temas){
        const resultadoEnlaces = await pool.query('SELECT * FROM enlaces WHERE tema_id = $1 ORDER BY votos DESC', [tema.id]);    
        tema.enlaces = resultadoEnlaces.rows;
    }

    return temas;
};

// --- CRUD DE TEMAS ---
const crear = async (titulo) => {
    await pool.query('INSERT INTO temas (titulo, votos) VALUES ($1, $2)', [titulo, 0]);
};

const votar = async (id) => {
    await pool.query('UPDATE temas SET votos = votos + 1 WHERE id = $1', [id]);
};

const actualizar = async (id, titulo) => {
    await pool.query('UPDATE temas SET titulo = $1 WHERE id = $2', [titulo, id]);
};

const eliminar = async (id) => {
    await pool.query('DELETE FROM temas WHERE id = $1', [id]);
};

// --- CRUD DE ENLACES ---
const crearEnlace = async (tema_id, url) => {
    await pool.query('INSERT INTO enlaces (tema_id, url, votos) VALUES ($1, $2, $3)', [tema_id, url, 0]);
};

const votarEnlace = async (id) => {
    await pool.query('UPDATE enlaces SET votos = votos + 1 WHERE id = $1', [id]);
};

const eliminarEnlace = async (id) => {
    await pool.query('DELETE FROM enlaces WHERE id = $1', [id]);
};

const actualizarEnlace = async (id, url) => {
    await pool.query('UPDATE enlaces SET url = $1 WHERE id = $2', [url, id]);
};

module.exports = { 
    obtenerTodos, 
    crear, 
    actualizar,
    votar, 
    eliminar, 
    crearEnlace, 
    votarEnlace, 
    eliminarEnlace,
    actualizarEnlace
};