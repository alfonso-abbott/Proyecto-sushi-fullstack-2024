import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

      <div className={`navbar-links ${isMenuOpen ? 'block' : 'hidden'}`} id="navbarLinks">
          <ul>
            <li><a href="/">Inicio</a></li>
            <li className="dropdown">
              <a href="#" className="dropbtn">Login</a>
              <div className="dropdown-content">
                <a href="/login">Acceso usuarios</a>
                <a href="/registro">Registrarse</a>
                <a href="#"></a>
                <a href="/usuarios">Listar Usuarios</a>
                <a href="/pedidos">Listar Pedidos</a>
                <a href="/Inicio">Salir</a>
              </div>
            </li>
            <li className="dropdown">
              <a href="#" className="dropbtn">Delivery</a>
              <div className="dropdown-content">
                <a href="/menu">Menú</a>
                <a href="/pedido">Mi Pedido</a>
              </div>
            </li>
            
          </ul>
        </div>


        <a href="#" className="brand-title">Fukusuke Sushi</a>
        <a href="javascript:void(0);" className="toggle-button" onClick={toggleMenu}>
          &#9776;
        </a>

        {/*
        <div className={`navbar-links ${isMenuOpen ? 'block' : 'hidden'}`} id="navbarLinks">
          <ul>
            <li><a href="/">Inicio</a></li>
            <li className="dropdown">
              <a href="#" className="dropbtn">Sushi</a>
              <div className="dropdown-content">
                <a href="/menu">Menú</a>
                <a href="/pedido">Pedir delivery</a>
              </div>
            </li>
            <li className="dropdown">
              <a href="#" className="dropbtn">Login</a>
              <div className="dropdown-content">
                <a href="/login">Acceso usuarios</a>
                <a href="/registro">Registrarse</a>
                {/*<a href="#">Acceso Administración</a>
                <a href="#">Salir</a>
              </div>
            </li>
          </ul>
        </div>*/}

      </div>
    </nav>
  );
};

export default Navbar;