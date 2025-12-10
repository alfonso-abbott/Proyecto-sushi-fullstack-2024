import Pedido from '../modelos/pedidos.js';


// Controlador para registrar un nuevo pedido
export const pedido = async (req, res) => {
  const { numeropedido, cliente, direccion, total, estadopago } = req.body;

  try {
    
    // Crea un nuevo pedido
    const nuevoPedido = new Pedido({ numeropedido, cliente, direccion, total, estadopago });
    await nuevoPedido.save();

    res.status(201).json({
      mensaje: 'Pedido registrado con éxito',
      usuario: { numeropedido: nuevoPedido.numeropedido, cliente: nuevoPedido.cliente, direccion: nuevoPedido.direccion, total: nuevoPedido.total, estadopago: nuevoPedido.estadopago },
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar pedido', error });
  }
};





// Controlador para listar pedidos
export const listarPedidos = async (req, res) => {
  try {
    // Consulta todos los usuarios en la base de datos
    const pedidos = await Pedido.find(); 
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los pedidos', error });
  }
};

// Controlador para listar un pedido por ID
export const listarPedidoPorId = async (req, res) => {
  const { id } = req.params; // Captura el ID desde los parámetros de la ruta

  try {
    // Busca el pedido por su ID
    const pedido = await Pedido.findById(id);

    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el pedido', error });
  }
};
