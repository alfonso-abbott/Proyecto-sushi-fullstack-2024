import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRutas from './rutas/autRutas.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Usar las rutas de autenticación
app.use('/api', authRutas);  // Conecta las rutas que contienen /registro y /login

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error(err));

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
