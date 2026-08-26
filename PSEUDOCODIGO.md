# Pseudocodigo - CRUD, Codigos y Votos

> Sigue este orden. Cada paso se construye sobre el anterior.

---

## PASO 1: Preparar el proyecto

```
1. Instalar dependencias: express y ejs
2. Verificar que server.js funcione: node server.js
   - Deberia mostrar "Servidor levantado en http://localhost:3000"
   - Si no funciona, revisar que express este instalado
```

---

## PASO 2: Crear la base de datos

Crear `data/db.json` con esta estructura:

```
{
  "topics": [
    {
      "id": 1,
      "title": "Como programar como un ninja",
      "description": "Aprende los secretos del codigo",
      "votes": 0,
      "links": [
        { "id": 1, "url": "https://ejemplo.com", "title": "Link ejemplo", "votes": 0 }
      ]
    }
  ],
  "nextTopicId": 2,
  "nextLinkId": 2
}
```

> Pon 2-3 temas de ejemplo para probar despues.

---

## PASO 3: Modelos (models/)

Los modelos son las funciones que LEEN y ESCRIBEN el archivo db.json.

### topicModel.js

```
funcion getTopics():
    leer el archivo db.json
    devolver el array de topics
    ordenar por votes de mayor a menor

funcion getTopicPorId(id):
    leer el archivo db.json
    buscar el topic con ese id
    devolverlo (si no existe, devolver null)

funcion crearTopic(title, description):
    leer el archivo db.json
    crear nuevo topic = {
        id: nextTopicId,
        title: title,
        description: description,
        votes: 0,
        links: []
    }
    agregar al array de topics
    nextTopicId = nextTopicId + 1
    guardar el archivo db.json
    devolver el nuevo topic

funcion actualizarTopic(id, title, description):
    leer el archivo db.json
    buscar el topic con ese id
    si existe: actualizar title y description
    guardar el archivo db.json
    devolver el topic actualizado

funcion eliminarTopic(id):
    leer el archivo db.json
    filtrar el array sin ese topic
    guardar el archivo db.json
    devolver true si se elimino, false si no existia

funcion votarTopic(id):
    leer el archivo db.json
    buscar el topic con ese id
    votes = votes + 1
    guardar el archivo db.json
    devolver el topic actualizado
```

### linkModel.js

```
funcion crearLink(topicId, url, title):
    leer db.json
    buscar el topic por topicId
    crear nuevo link = {
        id: nextLinkId,
        url: url,
        title: title,
        votes: 0
    }
    agregar al array links de ese topic
    nextLinkId = nextLinkId + 1
    guardar db.json
    devolver el link

funcion eliminarLink(topicId, linkId):
    leer db.json
    buscar el topic
    filtrar sus links sin ese linkId
    guardar db.json
    devolver true

funcion votarLink(topicId, linkId):
    leer db.json
    buscar el topic
    buscar el link dentro de ese topic
    votes = votes + 1
    guardar db.json
    devolver el link
```

---

## PASO 4: Controladores (controllers/)

Los controladores son el MIDDLEMAN: reciben la request, llaman al modelo, y devuelven respuesta.

### topicController.js

```
funcion mostrarTopics(req, res):
    topics = topicModel.getTopics()
    res.render("index", { topics: topics })

funcion mostrarTopic(req, res):
    topic = topicModel.getTopicPorId(req.params.id)
    si topic es null:
        res.status(404).send("Tema no encontrado")
    si no:
        res.render("topic", { topic: topic })

funcion crearTopic(req, res):
    topicModel.crearTopic(req.body.title, req.body.description)
    res.redirect("/")

funcion actualizarTopic(req, res):
    topicModel.actualizarTopic(req.params.id, req.body.title, req.body.description)
    res.redirect("/topic/" + req.params.id)

funcion eliminarTopic(req, res):
    topicModel.eliminarTopic(req.params.id)
    res.redirect("/")

funcion votarTopic(req, res):
    topic = topicModel.votarTopic(req.params.id)
    res.json(topic)
```

### linkController.js

```
funcion crearLink(req, res):
    linkModel.crearLink(req.params.topicId, req.body.url, req.body.title)
    res.redirect("/topic/" + req.params.topicId)

funcion eliminarLink(req, res):
    linkModel.eliminarLink(req.params.topicId, req.params.linkId)
    res.redirect("/topic/" + req.params.topicId)

funcion votarLink(req, res):
    link = linkModel.votarLink(req.params.topicId, req.params.linkId)
    res.json(link)
```

---

## PASO 5: Rutas (routes/routes.js)

```
const express = require("express")
const router = express.Router()
const topicCtrl = require("../controllers/topicController")
const linkCtrl = require("../controllers/linkController")

// --- Paginas ---
GET  /                  -> topicCtrl.mostrarTopics
GET  /topic/:id         -> topicCtrl.mostrarTopic
POST /topics/crear      -> topicCtrl.crearTopic
POST /topics/:id/update -> topicCtrl.actualizarTopic
POST /topics/:id/delete -> topicCtrl.eliminarTopic

// --- Votaciones (responden JSON para fetch) ---
POST /topics/:id/vote       -> topicCtrl.votarTopic
POST /topics/:topicId/links/crear   -> linkCtrl.crearLink
POST /topics/:topicId/links/:linkId/delete -> linkCtrl.eliminarLink
POST /topics/:topicId/links/:linkId/vote   -> linkCtrl.votarLink

module.exports = router
```

> En server.js ya tienes `app.use("/", rutas)` asi que todo va a funcionar.

---

## PASO 6: Vistas EJS (views/)

### index.ejs — Lista de todos los temas

```
<html>
  <body>
    <h1>Temas de aprendizaje</h1>

    FORMULARIO para crear tema nuevo:
      input: titulo
      textarea: descripcion
      boton: Crear tema

    para cada topic en topics:
      <div>
        <h2> {topic.title} </h2>
        <p> {topic.description} </p>
        <p>Votos: {topic.votes} </p>
        <button id="vote-topic-{topic.id}"> Votar </button>
        <a href="/topic/{topic.id}"> Ver temas y enlaces </a>
      </div>

    <script src="/js/votes.js"></script>
  </body>
</html>
```

### topic.ejs — Detalle de un topic con sus links

```
<html>
  <body>
    <a href="/">Volver</a>

    <h1> {topic.title} </h1>
    <p> {topic.description} </p>
    <p>Votos: {topic.votes} </p>
    <button id="vote-topic-{topic.id}"> Votar </button>

    FORMULARIO para agregar link:
      input: titulo del link
      input: url
      boton: Agregar link

    <h2>Enlaces</h2>
    para cada link en topic.links:
      <div>
        <a href="{link.url}"> {link.title} </a>
        <p>Votos: {link.votes} </p>
        <button id="vote-link-{link.id}"> Votar </button>
        <form method="POST" action="/topics/{topic.id}/links/{link.id}/delete">
          <button type="submit">Eliminar</button>
        </form>
      </div>

    <script src="/js/votes.js"></script>
  </body>
</html>
```

> Los formularios de CREAR y ELIMINAR usan method="POST" nativo.
> Solo los VOTOS usan JavaScript puro sin recargar la pagina.

---

## PASO 7: Frontend JavaScript puro (public/js/votes.js)

```
Cuando la pagina carga:

1. BUSCAR todos los botones de voto de topics
2. Para cada boton de topic:
     cuando el usuario haga click:
       hacer fetch POST a "/topics/{id}/vote"
       recibir la respuesta JSON con el topic actualizado
       encontrar el elemento que muestra los votos de ese topic
       actualizar el texto con el nuevo conteo

3. BUSCAR todos los botones de voto de links
4. Para cada boton de link:
     cuando el usuario haga click:
       hacer fetch POST a "/topics/{topicId}/links/{linkId}/vote"
       recibir la respuesta JSON con el link actualizado
       encontrar el elemento que muestra los votos de ese link
       actualizar el texto con el nuevo conteo
```

---

## Resumen visual del flujo

```
USUARIO
  │
  ▼
BOTON "Votar" (votes.js)
  │  fetch POST /topics/1/vote
  ▼
RUTA (routes.js)
  │  llama a topicCtrl.votarTopic
  ▼
CONTROLADOR (topicController.js)
  │  llama a topicModel.votarTopic
  ▼
MODELO (topicModel.js)
  │  lee db.json, votes++, guarda db.json
  ▼
RESPUESTA JSON devuelta al frontend
  │
  ▼
votes.js actualiza los votos en pantalla SIN recargar
```

---

## Orden sugerido de implementacion

1. `npm install express ejs`
2. `data/db.json` (con datos de ejemplo)
3. `models/topicModel.js`
4. `models/linkModel.js`
5. `controllers/topicController.js`
6. `controllers/linkController.js`
7. `routes/routes.js`
8. `views/index.ejs`
9. `views/topic.ejs`
10. `public/js/votes.js`
11. Probar todo: node server.js -> http://localhost:3000
