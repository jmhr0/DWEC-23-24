const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jherram:MFz2BbdNkUZqlwqd@cluster0.jb3gvow.mongodb.net/?retryWrites=true&w=majority";
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

let db;

MongoClient.connect(uri, function(err, client) {
  if (err) throw err;
  db = client.db('cluster0');
});

app.get('/documents', async (req, res) => {
  const collection = db.collection('ActT14T2');
  const documents = await collection.find().toArray();
  res.send(documents);
});

app.post('/documents', async (req, res) => {
  const collection = db.collection('ActT14T2');
  const result = await collection.insertOne(req.body);
  res.send(result);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor desplegado en el puerto ${PORT}`));
