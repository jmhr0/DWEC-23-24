// Importamos los módulos necesarios
import express from "express"; // Importamos Express.js para manejar las rutas y las solicitudes HTTP
import path from "path"; // Importamos el módulo 'path' para manejar rutas de archivos y directorios
import { MongoClient, ServerApiVersion } from "mongodb"; // Importamos el cliente MongoDB y la versión de la API del servidor
import bodyParser from "body-parser"; // Importamos body-parser para analizar el cuerpo de las solicitudes HTTP

// Inicializamos Express
const app = express();

// Resolvemos la ruta del directorio actual
const __dirname = path.resolve();

// Configuramos aplicaciones middleware
app.use(express.static(__dirname)); // Servimos archivos estáticos desde el directorio raíz del servidor
app.use(bodyParser.json()); // Parseamos el cuerpo de las solicitudes HTTP con formato JSON

// Creamos un enrutador utilizando express.Router()
const router = express.Router();

// Definimos la cadena de conexión de MongoDB
const uri =
  "mongodb+srv://jherram:MFz2BbdNkUZqlwqd@cluster0.jb3gvow.mongodb.net/?retryWrites=true&w=majority";

// Instanciamos un nuevo cliente MongoDB
const client = new MongoClient(uri);

// Definimos una ruta GET para la ruta raíz
router.get("/", (req, res) => {
  // Enviamos el archivo 'index.html' desde el directorio raíz del servidor
  res.sendFile(path.join(__dirname, "/index.html"));
});

// Ruta POST para manejar solicitudes
app.post("/datos", async (req, res) => {
  try {
    // Verifica si el campo "nombre" no está vacoi
    if (req.body.nombre !== "") {
      await conectarDbWrite(req.body);
      const datos = await conectarDbRead();
      res.json(datos);
    } else {
      // Si el campo "nombre" esta vacío, envia todos los datos existentes como respuesta JSON
      const datos = await conectarDbRead();
      res.json(datos);
    }
  } catch (error) {
    // Captura de errores
    console.error(error);
  } finally {
    // Indica que ha seguido su curso correcto
    console.log("Funciona correctamente");
  }
});

// Para leer datos de la base de datos
async function conectarDbRead() {
  try {
    // Conecta a la base de datos y obtiene la colección de datos
    await client.connect();
    const coleccion = client.db("Cluster0").collection("T14ACT2");
    // Lee todos los documentos de la colección y los devuelve como un array
    const datos = await coleccion.find().toArray();
    return datos;
  } catch (error) {
    // Captura y maneja cualquier error que pueda ocurrir
    console.error(error);
  } finally {
    // Cierra la conexión con la base de datos
    await client.close();
  }
}

// Para escribir datos en la base de datos
async function conectarDbWrite(req) {
  try {
    // Conecta a la base de datos y obtiene la colección de datos
    await client.connect();
    const coleccion = client.db("Cluster0").collection("T14ACT2");
    // Inserta un nuevo documento en la colección usando los datos recibidos
    const nuevoDocumento = req;
    const result = await coleccion.insertOne(nuevoDocumento);
  } catch (error) {
    // Captura y maneja cualquier error que pueda ocurrir
    console.error(error);
  } finally {
    // Cierra la conexión con la base de datos
    await client.close();
  }
}

// Inicia el servidor Express.js y escucha en el puerto 3000
app.listen(3000, () => console.log("Escuchando en el puerto 3000"));
