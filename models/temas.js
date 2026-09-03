const pool = require('./db')
const obtenerTodos = async ()=> {
    const resultado = await pool.query('SELECT * FROM temas BY votos DESC');
    return resultado.rows;
};
    
const crear = async(titulo) => {
    await pool.query('INSERT INTO temas (titulo, votos) VALUES ($1, $2)', [titulo, 0]);
}

module.exports = { obtenerTodos, crear }


