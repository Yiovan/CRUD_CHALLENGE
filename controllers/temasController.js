const temas = require('../models/temas');

const obtenerTemas = (req, res) => {
    res.json(temas);
};

module.exports = {
    obtenerTemas
}