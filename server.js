// 1. Importar Express
const express = require('express');
const app = express();
const PORT = 3000;
const temasController = require('./controllers/temasController');
// 2. Configurar el motor de plantillas (usaremos EJS)
app.set('view engine', 'ejs');
app.set('views', './views'); 

// 3. Preparar el servidor para entender datos (formularios y JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 4. Habilitar la carpeta "public" para tu CSS y JS del frontend
app.use(express.static('public'));

// 5. Una ruta básica para probar que funciona
app.get('/', temasController.obtenerTemas);

// 6. Encender el servidor
app.listen(PORT, () => {
    console.log(`Servidor activo. Abre en tu navegador: http://localhost:${PORT}`);
});