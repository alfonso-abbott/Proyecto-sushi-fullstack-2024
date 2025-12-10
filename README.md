# Fukusuke Sushi – Aplicación Fullstack de Delivery

Aplicación web fullstack para gestionar pedidos de sushi. Incluye un backend en Express/MongoDB y un frontend en React/Vite con flujos de registro/login, creación y listado de usuarios y pedidos.

## Características principales
- API REST para registrar usuarios, iniciar sesión y administrar pedidos.
- Persistencia en MongoDB usando Mongoose.
- Frontend con React Router y contexto de carrito para armar pedidos.
- Formularios de registro, login y pedido con modales de retroalimentación.
- Listados de usuarios y pedidos conectados al backend.

## Arquitectura
Frontend y backend viven en carpetas separadas. El backend expone la API en el puerto 5000 y el frontend consume los endpoints desde el navegador.

```
+-----------------+        HTTP/JSON         +-----------------------+
| React (Vite)    | <--------------------->  | Express + Mongoose    |
| http://localhost:5173 |                    | http://localhost:5000 |
+-----------------+                          +-----------------------+
```

## Tecnologías utilizadas
**Backend**
- Node.js, Express
- Mongoose (MongoDB)
- dotenv, cors, body-parser
- nodemon (desarrollo)

**Frontend**
- React 18, React Router
- Vite
- react-hook-form
- Tailwind CSS + PostCSS/Autoprefixer
- ESLint

## Estructura de carpetas
```
Proyecto-sushi-fullstack-2024/
├─ Backend/
│  ├─ controladores/      # Lógica de usuarios y pedidos
│  ├─ modelos/            # Esquemas Mongoose
│  ├─ rutas/              # Definición de rutas Express
│  ├─ server.js           # Bootstrap del servidor
│  ├─ package.json
├─ Frontend/
│  ├─ src/
│  │  ├─ components/      # Navbar
│  │  ├─ context/         # CarritoContext
│  │  ├─ pages/           # Vistas: inicio, menú, pedido, auth, listados
│  │  ├─ App.jsx, main.jsx
│  ├─ index.html, vite.config.js, package.json
└─ README.md
```

## Instalación y configuración
### Requisitos previos
- Node.js 18+
- MongoDB en ejecución y cadena de conexión.

### Clonado del repositorio
```bash
git clone <url-del-repo>
cd Proyecto-sushi-fullstack-2024
```

### Backend
1. Crear archivo `.env` en `Backend/` con:
   ```env
   MONGO_URI=mongodb://<usuario>:<password>@<host>:<puerto>/<db>
   PORT=5000
   ```
2. Instalar dependencias:
   ```bash
   cd Backend
   npm install
   ```
3. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```

### Frontend
1. Instalar dependencias:
   ```bash
   cd Frontend
   npm install
   ```
2. Ejecutar en desarrollo (Vite):
   ```bash
   npm run dev
   ```

## API del Backend
Base URL por defecto: `http://localhost:5000/api`

### POST /api/registro
- **Descripción:** Crea un usuario nuevo.
- **Body JSON:**
  ```json
  {
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "secreto"
  }
  ```
- **Respuestas:**
  - `201 Created` → `{ mensaje, usuario: { nombre, email } }`
  - `400 Bad Request` si el correo ya existe.
  - `500 Internal Server Error` en fallos del servidor.

### GET /api/listarusuarios
- **Descripción:** Devuelve todos los usuarios sin contraseñas.
- **Respuesta:**
  - `200 OK` → `[{ _id, nombre, email }, ...]`
  - `500 Internal Server Error` en errores de consulta.

### POST /api/pedido
- **Descripción:** Registra un pedido.
- **Body JSON:**
  ```json
  {
    "numeropedido": "PED-12345",
    "cliente": "Cliente Demo",
    "direccion": "Calle 123",
    "total": "12000",
    "estadopago": "Pendiente"
  }
  ```
- **Respuestas:**
  - `201 Created` → `{ mensaje, usuario: { numeropedido, cliente, direccion, total, estadopago } }`
  - `500 Internal Server Error` en fallos de guardado.

### GET /api/listarpedidos
- **Descripción:** Lista todos los pedidos.
- **Respuesta:**
  - `200 OK` → `[{ _id, numeropedido, cliente, direccion, total, estadopago }, ...]`
  - `500 Internal Server Error` en errores de consulta.

> También existen rutas auxiliares para obtener usuarios o pedidos por ID (`/api/usuarios/:id`, `/api/pedidos/:id`).

## Funcionamiento del Frontend
- **Routing:** `App.jsx` usa React Router para las vistas: Inicio, Menú, Pedido, Registro, Login, Recuperar Password, Listar Usuarios y Listar Pedidos.
- **Estado global:** `CarritoContext` gestiona el carrito y se inyecta en toda la app.
- **Consumo de API:**
  - `Registro.jsx` envía POST a `/api/registro`.
  - `Login.jsx` envía POST a `/api/login`.
  - `Pedido.jsx` envía POST a `/api/pedido` para registrar compras.
  - `ListarUsuarios.jsx` consume GET `/api/listarusuarios`.
  - `ListarPedidos.jsx` consume GET `/api/listarpedidos`.
- **UI principal:** `Navbar` enlaza las secciones; `Menu` muestra productos con modal al agregarlos; `Pedido` calcula totales y permite elegir pago/dirección.

## Scripts disponibles
### Backend (`Backend/package.json`)
- `npm run start` → Ejecuta el servidor Express.
- `npm run dev` → Ejecuta con nodemon para recarga en caliente.
- `npm test` → Placeholder sin pruebas.

### Frontend (`Frontend/package.json`)
- `npm run dev` → Servidor de desarrollo Vite.
- `npm run build` → Compila la aplicación para producción.
- `npm run preview` → Sirve el build generado.
- `npm run lint` → Ejecuta ESLint.

## Ejecución completa del proyecto
1. Inicia MongoDB y configura `.env` en el backend.
2. En una terminal, ejecutar backend en `http://localhost:5000`:
   ```bash
   cd Backend
   npm run dev
   ```
3. En otra terminal, ejecutar frontend en `http://localhost:5173`:
   ```bash
   cd Frontend
   npm run dev
   ```
4. Accede al frontend y navega por el flujo de pedidos; las vistas consumirán la API del backend.

## Mejoras futuras
- Hash de contraseñas y uso de JWT para autenticación real.
- Validación de esquemas y manejo de errores más detallado en la API.
- Sincronizar el carrito del frontend con el backend y persistir pedidos por usuario.
- Tests automatizados (unitarios y de integración) para API y componentes.
- Manejo de variables de entorno del frontend para URLs de API.

## Licencia
Este proyecto se distribuye bajo la licencia MIT.
