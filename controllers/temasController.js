const temas = require('../models/temas');

const obtenerTemas = (req, res) => {
    res.render('index', { temas: temas });
};

// NUEVA FUNCIÓN: Recibe el formulario y crea el tema
const crearTema = (req, res) => {
    const nuevoTema = {
        id: Date.now(), // Crea un número único rápido para el ID
        titulo: req.body.titulo, // Atrapa lo que el usuario escribió en el "input"
        votos: 0,
        enlaces: []
    };
    
    temas.push(nuevoTema); // Lo guardamos en nuestra "base de datos"
    res.redirect('/'); // Recargamos la página para ver el cambio
};

// Exportamos ambas funciones
module.exports = {
    obtenerTemas,
    crearTema
};