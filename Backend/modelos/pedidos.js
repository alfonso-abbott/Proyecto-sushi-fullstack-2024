import mongoose from 'mongoose'

const pedidoSchema = new mongoose.Schema({
    numeropedido: { type: String, required: true },
    cliente: { type: String, required: true, unique: true },
    direccion: { type: String, required: true },
    total: { type: String, required: true },
    estadopago: { type: String, required: true },
  }, { collection: 'pedidos' }); // Nombre específico para la colección
  

export default mongoose.model('pedidos',pedidoSchema) //mongoose convierte el modelo usuario a la coleccion usuarios de mongodb
