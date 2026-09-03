const temas = require('../models/temas');

const obtenerTemas = async (req, res) => {
    const listaTemas = await temas.obtenerTodos();
    res.render('index', { temas: listaTemas });
};

// NUEVA FUNCIÓN: Recibe el formulario y crea el tema
const crearTema = async (req, res) => {
    // const nuevoTema = {
    //     id: Date.now(), // Crea un número único rápido para el ID
    //     titulo: req.body.titulo, // Atrapa lo que el usuario escribió en el "input"
    //     votos: 0,
    //     enlaces: []
    // };
    
    // temas.push(nuevoTema); // Lo guardamos en nuestra "base de datos"
    await temas.crear(req.body.titulo);
    res.redirect('/'); // Recargamos la página para ver el cambio
};

// Exportamos ambas funciones
module.exports = {
    obtenerTemas,
    crearTema
};