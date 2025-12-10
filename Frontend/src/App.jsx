import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Menu from './pages/Menu';
import Pedido from './pages/Pedido';
import Registro from './pages/Registro';
import Login from './pages/Login';
import RecuperarPassword from './pages/RecuperarPassword';
import ListarUsuarios from './pages/ListarUsuarios'; 
import ListarPedidos from './pages/ListarPedidos'; 
import { CarritoProvider } from './context/CarritoContext'; 
function App() {
  return (
    <CarritoProvider> {/* Envolver la aplicación con el proveedor */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/menu" element={<Menu />} /> 
          <Route path="/pedido" element={<Pedido />} /> 
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/recuperar-password" element={<RecuperarPassword />} />
          <Route path="/usuarios" element={<ListarUsuarios />} /> 
          <Route path="/pedidos" element={<ListarPedidos />} /> 
        </Routes>
      </Router>
    </CarritoProvider>
  );
}

export default App;


