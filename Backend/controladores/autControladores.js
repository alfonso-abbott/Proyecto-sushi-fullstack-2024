import Usuario from '../modelos/modelo.js';

// Controlador para registrar un nuevo usuario
export const registro = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verifica si el email ya está registrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Crea un nuevo usuario
    const nuevoUsuario = new Usuario({ nombre, email, password });
    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: 'Usuario registrado con éxito',
      usuario: { nombre: nuevoUsuario.nombre, email: nuevoUsuario.email },
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error });
  }
};

// Controlador para iniciar sesión
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca al usuario por su email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verifica la contraseña
    if (usuario.password !== password) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Devuelve una respuesta exitosa
    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: { nombre: usuario.nombre, email: usuario.email },
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};

// Controlador para listar usuarios (opcional, si decides incluirlo aquí)
export const listarUsuarios = async (req, res) => {
  try {
    // Consulta todos los usuarios en la base de datos
    const usuarios = await Usuario.find().select('-password'); // Excluye el campo de contraseña
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los usuarios', error });
  }
};

// Controlador para listar usuario por ID
export const listarUsuarioPorId = async (req, res) => {
  const { id } = req.params; // Captura el ID del parámetro de la ruta

  try {
    // Busca al usuario por su ID
    const usuario = await Usuario.findById(id).select('-password'); // Excluye la contraseña en la respuesta

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el usuario', error });
  }
};
