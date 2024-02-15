import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const __dirname = path.resolve();

app.use(express.static(__dirname));
app.use(bodyParser.json());

const uri = "mongodb+srv://jherram:MFz2BbdNkUZqlwqd@cluster0.jb3gvow.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/datos', async (req, res) => {
    try {
        await client.connect();
        const coleccion = client.db("Cluster0").collection("T14ACT2");
        const datos = await coleccion.find().toArray();
        res.json(datos);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
});

app.post('/agregar', async (req, res) => {
    try {
        await client.connect();
        const coleccion = client.db("Cluster0").collection("T14ACT2");
        const nuevoDocumento = { nombre: req.body.nombre, apellidos: req.body.apellidos };
        const resultado = await coleccion.insertOne(nuevoDocumento);
        res.status(200).send('Usuario agregado con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el usuario');
    } finally {
        await client.close();
    }
});

app.listen(3000, () => console.log('Escuchando en el puerto  3000'));
