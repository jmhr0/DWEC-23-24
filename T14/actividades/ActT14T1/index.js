// Imports
import express from 'express';
import path from 'path';
const app = express();
const router = express.Router();
const __dirname = path.resolve();
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/T14act1pet', (req, res) => {
  let obj = {
    nombre: 'Juan Manuel ',
    apellidos: 'Herrera Ramirez'
  };

  res.json(obj);
});

app.use('/', router);
app.use(express.static(__dirname));
app.listen(3000, () => {
  console.log('Escuchando en puerto 3000');
});