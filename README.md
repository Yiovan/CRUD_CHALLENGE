
1

Automatic Zoom
Imagínate esto: acabas de ser contratado por Learn It, Love It Inc., una plataforma educativa en 
ascenso. Quieren una aplicación donde los usuarios puedan agregar, actualizar y eliminar temas 
de aprendizaje, como "Cómo programar como un ninja" o "Dominar el arte de preparar café". 
Pero hay un giro: los usuarios deberían poder votar a favor de los temas y enlaces que 
encuentren más útiles, y la aplicación debería reordenar dinámicamente el contenido según los 
votos. Ah, y ¿mencionamos? Harás todo con Node.js, Express, un motor de plantillas, y 
JavaScript puro. Sin presión. 
Antes de comenzar: Conceptos para repasar 
Antes de sumergirse de lleno en este desafío, asegúrense de que su cerebro esté bien 
alimentado. No los vamos a enviar a la batalla sin armas: 
●  Node.js y Express: Estos son tus ejes de batalla. Aprende cómo configurar un servidor, 
definir rutas y manejar solicitudes/respuestas HTTP. Aquí estás construyendo la 
columna vertebral de tu aplicación. 
●  HTTP: Entiende cómo funcionan las solicitudes y respuestas HTTP. Cada vez que un 
usuario interactúa con tu aplicación, se están enviando solicitudes HTTP (GET, POST, 
PUT, DELETE) al servidor, y tu trabajo será manejar estas solicitudes de manera efectiva. 
●  Motores de plantillas: Piensa en estos como tu arma secreta. Ya sea EJS o Handlebars, 
aprende a transformar datos en una página web que los usuarios puedan ver. Este es tu 
primer paso para conectar el servidor con el cliente. 
●  JavaScript puro: Sin frameworks, sin bibliotecas, solo tú y JavaScript. Como un 
verdadero guerrero del código, lo harás a la antigua. Arquitectura MVC con Express: Si tu 
aplicación fuera una pizza, MVC sería la masa, la salsa y el queso. Aprende a organizar tu 
aplicación para que todo esté en su lugar correcto y listo para ser devorado. 
¡¡ Empecemos !! 
Configuración del servidor Express: 
💡Imagina que tu servidor es como una tienda en línea. Node.js es el motor que pone todo en 
marcha, mientras que Express es la estructura que le da forma a tu tienda. 
●  Necesitas configurar tu servidor para que esté listo para recibir "clientes" (los usuarios). 
Esto implica crear un entorno donde el servidor pueda escuchar y responder a 
solicitudes, como si abrieras las puertas de tu tienda para que la gente pueda entrar y 
explorar. 
●  Luego el protocolo HTTP entra en juego. Cada vez que alguien visita tu "tienda", en 
realidad está enviando una solicitud HTTP al servidor. Tu servidor necesita estar 
preparado para recibir estas solicitudes, procesarlas y enviar una respuesta adecuada. 
●  Define rutas para las operaciones CRUD y votaciones. Estas rutas son las autopistas de 
tu aplicación, manejando solicitudes HTTP (GET, POST, PUT, DELETE) que conectan a los 
usuarios con los datos. 
Magia del motor de plantillas: 
💡  Imagina que tu servidor está organizando una exhibición de arte. Los datos JSON que tienes, 
como los temas de aprendizaje y enlaces, son como las obras de arte en bruto. No son muy 
atractivos por sí mismos, pero aquí es donde entra el motor de plantillas. Toma los datos JSON y 
los "pinta" en una página web que los usuarios pueden ver e interactuar. 
●  Elige tu motor de plantillas favorito: EJS o Handlebars. Luego úsalo para convertir esos 
datos JSON en páginas web que los usuarios puedan ver e interactuar. 
Funcionalidad CRUD: 
Añade funcionalidades CRUD a tu ejercicio. Da a los usuarios el poder de crear, leer, actualizar y 
eliminar temas de aprendizaje. 
Dentro de cada tema, permite que los usuarios agreguen, actualicen y eliminen enlaces. 
Manejo de solicitudes y respuestas HTTP: 
💡 ¿Qué son las Solicitudes HTTP?  
Las solicitudes HTTP son la base de la comunicación entre un cliente (como un navegador) y un 
servidor. 
●  Aprende a manejar solicitudes HTTP en tu servidor Express. Cada vez que un usuario 
realiza una acción (como votar por un tema o agregar un enlace), tu servidor recibirá una 
solicitud HTTP y deberá responder adecuadamente. 
●  Asegúrate de que tu servidor maneje correctamente las diferentes solicitudes HTTP para 
las operaciones CRUD (Crear, Leer, Actualizar, Eliminar). 
Sistema de votaciones: 
●  Implementa un botón de votaciones que permita a los usuarios votar por temas y 
enlaces. El servidor actualiza el conteo de votos en la base de datos y puede reordenar el 
contenido según los votos recibidos. Asegúrate de que la interfaz del usuario se 
actualice en tiempo real para reflejar estos cambios., 
Arquitectura MVC: 
💡 La arquitectura MVC (Modelo-Vista-Controlador) es un patrón de diseño que organiza el código 
de una aplicación en tres componentes principales, facilitando su desarrollo, mantenimiento y 
escalabilidad. 
●  Modelo: Aquí es donde viven los datos. Maneja los temas, enlaces y conteos de votos. 
Aquí es donde se almacenan y procesan los datos que se mostrarán en la aplicación. 
●  Vista: La parte que los usuarios realmente ven. Usa tu motor de plantillas para crear 
páginas limpias. 
