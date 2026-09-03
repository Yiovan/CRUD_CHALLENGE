const temas = require('../models/temas');

const obtenerTemas = async (req, res) => {
    try {
        const listaTemas = await temas.obtenerTodos();
        res.render('index', { temas: listaTemas });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los temas');
    }
};

const crearTema = async (req, res) => {
    try {
        if (!req.body.titulo || !req.body.titulo.trim()) {
            return res.status(400).json({ error: "El título es obligatorio" });
        }
        await temas.crear(req.body.titulo.trim());
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el tema');
    }
};

const votarTema = async (req, res) => {
    try {
        const id = req.params.id;
        await temas.votar(id);
        res.json({ mensaje: "Voto registrado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo registrar el voto" });
    }
};

const eliminarTema = async (req, res) => {
    try {
        const id = req.params.id;
        await temas.eliminar(id);
        res.json({ mensaje: "Tema eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo eliminar el tema" });
    }
};

const actualizarTema = async (req, res) => {
    try {
        const id = req.params.id;
        const { titulo } = req.body;
        if (!titulo || !titulo.trim()) {
            return res.status(400).json({ error: "El título es obligatorio" });
        }
        await temas.actualizar(id, titulo.trim());
        res.json({ mensaje: "Tema actualizado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar el tema" });
    }
};

// --- NUEVAS FUNCIONES PARA ENLACES ---
const crearEnlace = async (req, res) => {
    try {
        const temaId = req.params.id;
        const { url } = req.body;
        if (!url || !url.trim()) {
            return res.status(400).json({ error: "La URL es obligatoria" });
        }
        await temas.crearEnlace(temaId, url.trim());
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el enlace');
    }
};

const votarEnlace = async (req, res) => {
    try {
        const id = req.params.id;
        await temas.votarEnlace(id);
        res.json({ mensaje: "Voto de enlace registrado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo registrar el voto del enlace" });
    }
};

const eliminarEnlace = async (req, res) => {
    try {
        const id = req.params.id;
        await temas.eliminarEnlace(id);
        res.json({ mensaje: "Enlace eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo eliminar el enlace" });
    }
};

const actualizarEnlace = async (req, res) => {
    try {
        const id = req.params.id;
        const { url } = req.body;
        if (!url || !url.trim()) {
            return res.status(400).json({ error: "La URL es obligatoria" });
        }
        await temas.actualizarEnlace(id, url.trim());
        res.json({ mensaje: "Enlace actualizado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar el enlace" });
    }
};

module.exports = {
    obtenerTemas,
    crearTema,
    votarTema,
    eliminarTema,
    actualizarTema,
    crearEnlace,
    votarEnlace,
    eliminarEnlace,
    actualizarEnlace
};
