import {Router} from 'express'
import { registro, login, listarUsuarios, listarUsuarioPorId } from '../controladores/autControladores.js'
import { pedido, listarPedidos,listarPedidoPorId } from '../controladores/autPedidos.js'
const router = Router()

router.post('/registro',registro)
router.post('/login',login)

// Ruta para listar todos los usuarios
router.get('/listarusuarios', listarUsuarios);

router.post('/pedido',pedido)

router.get('/listarpedidos',listarPedidos)

// Listar un pedido por ID
router.get('/pedidos/:id',listarPedidoPorId);

// Listar un usuario por ID
router.get('/usuarios/:id', listarUsuarioPorId);

export default router
