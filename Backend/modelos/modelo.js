import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  }, { collection: 'usuarios' }); // Nombre específico para la colección
  

export default mongoose.model('usuarios',usuarioSchema) //mongoose convierte el modelo usuario a la coleccion usuarios de mongodb
