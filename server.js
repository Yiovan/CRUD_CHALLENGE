// ============================================
// SERVER.JS
// ============================================

const express = require("express"); // Corregido: "express" con doble 's'
const path = require("path");
const rutas = require("./routes/routes.js");

const app = express(); // Agregado: "const"

// 3. CONFIGURAR el motor de plantillas
app.set("view engine", "ejs");
app.set("views", "./views");

// 4. MIDDLEWARES (Deben ir dentro de app.use)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// 5. MONTAR las rutas principales
app.use("/", rutas); // Agregado: el manejador "rutas"

// 6. LEVANTAR el servidor
const PORT = 3000; // Agregado: "const"
app.listen(PORT, () => {
    console.log("Servidor levantado en http://localhost:" + PORT); // Corregido: "//" en el enlace
});