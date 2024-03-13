// Importamos los módulos necesarios
import express from "express"; // Importamos Express.js para manejar las rutas y las solicitudes HTTP
import path from "path"; // Importamos el módulo 'path' para manejar rutas de archivos y directorios
import bodyParser from "body-parser"; // Importamos body-parser para analizar el cuerpo de las solicitudes HTTP
import firebase from "firebase"; // Importamos Firebase para interactuar con la base de datos

// Inicializamos Express
const app = express();

// Resolvemos la ruta del directorio actual
const __dirname = path.resolve();

// Configuracion del middleware
app.use(express.static(__dirname)); // Servimos archivos estáticos desde el directorio raíz del servidor
app.use(bodyParser.json()); // Parseamos el cuerpo de las solicitudes HTTP con formato JSON

// Inicializamos Firebase con la configuración de firebase (proyecto creado previamente)
firebase.initializeApp({
  apiKey: "AIzaSyBB2T1zruhYbtX_8VZb9kGTDwUiK9TPhvE",
  authDomain: "ejemplotareas-a625a.firebaseapp.com",
  projectId: "ejemplotareas-a625a",
});

// Obtenemos una referencia a la base de datos de Firebase
const db = firebase.firestore();

// Definimos una ruta GET para la ruta raíz
app.get("/", (req, res) => {
  // Enviamos el archivo 'index.html' al directorio raíz del servidor
  res.sendFile(path.join(__dirname, "/index.html"));
});

// Definimos una ruta POST para manejar los datos del formulario
app.post("/datos", async (req, res) => {
  try {
    // Verificamos si hay un nombre en la solicitud
    if (req.body.nombre !== "") {
      // Guardamos los datos en la BBDD
      await db.collection("T14ACT2").add(req.body);
    }

    // Obtenemos todos los datos de la colección
    const datosSnapshot = await db.collection("T14ACT2").get();
    const datos = [];
    datosSnapshot.forEach((doc) => {
      datos.push(doc.data());
    });

    // Enviamos los datos al cliente
    res.json(datos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

// Iniciamos el servidor en el puerto 3001 (en el 3000 esta la act normal)
app.listen(3001, () => {
  console.log("Escuchando en el puerto 3001");
});
