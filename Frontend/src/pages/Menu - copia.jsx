import React, { useState } from 'react';
import './Modal.css'; // Asegúrate de que el CSS del modal esté importado correctamente

const Menu = ({ agregarAlCarrito }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const platos = [
    {
      nombre: "Tempura Panko Rolls",
      descripcion: "Deliciosos rolls empanizados con panko, fritos y servidos con salsa de soja.",
      precio: 9000,
      imagen: "src/img/sushi1.jpg",
    },
    {
      nombre: "Sushi Nigiri",
      descripcion: "Pescado fresco sobre una base de arroz, servido con salsa de soja.",
      precio: 7000,
      imagen: "src/img/sushi2.jpg",
    },
    {
      nombre: "Maki de Atún",
      descripcion: "Roll de atún fresco envuelto en alga nori y arroz.",
      precio: 7500,
      imagen: "src/img/sushi3.jpg",
    },
    {
      nombre: "Dragon Roll",
      descripcion: "Roll de aguacate, pepino y cangrejo, con topping de anguila y salsa teriyaki.",
      precio: 9500,
      imagen: "src/img/sushi4.jpg",
    },
    {
      nombre: "Rainbow Roll",
      descripcion: "Roll de cangrejo y pepino, cubierto con pescado variado y aguacate.",
      precio: 8500,
      imagen: "src/img/sushi5.jpg",
    },
    {
      nombre: "Sashimi de Salmón",
      descripcion: "Finas láminas de salmón fresco, servidas con salsa de soja.",
      precio: 9500,
      imagen: "src/img/sushi6.jpg",
    },
    {
      nombre: "Ensalada de Algas",
      descripcion: "Ensalada fresca de algas con sésamo y vinagreta.",
      precio: 4000,
      imagen: "src/img/sushi7.jpg",
    },
    {
      nombre: "Postre Mochi",
      descripcion: "Delicioso mochi relleno de helado.",
      precio: 3000,
      imagen: "src/img/sushi8.jpg",
    },
  ];

  const handleAgregarAlCarrito = (plato) => {
    agregarAlCarrito(plato); // Agrega el plato al carrito
    //setModalMessage(`${plato.nombre} ha sido agregado al carrito`); // Configura el mensaje del modal
    setModalMessage(`${plato.nombre}`); 
    setIsModalVisible(true); // Muestra el modal
  };

  const closeModal = () => {
    setIsModalVisible(false); // Oculta el modal
  };

  return (


    <div className="menu-sushi p-6">
      <h1 className="text-2xl font-bold mb-6">Menú</h1>
      <button className="submit-button" >
            </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platos.map((plato, index) => (
          <div key={index} className="plato p-4 border border-gray-300 rounded-lg shadow-md flex flex-col items-center">
            <img 
              src={plato.imagen} 
              alt={plato.nombre} 
              className="w-full h-40 object-cover rounded-md mb-2" 
              style={{ display: 'block', margin: '0 auto' }} 
            />
            <h3 className="text-center">{plato.nombre}</h3>
            <p className="text-center">{plato.descripcion}</p>
            <p className="text-lg font-bold mt-2">${plato.precio.toLocaleString()} CLP</p>
            <button 
              onClick={() => handleAgregarAlCarrito(plato)} 
              className="submit-button bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Modal para producto agregado */}
      {isModalVisible && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
          
            <h2>Producto Agregado</h2>
            <h3>{modalMessage}</h3>
            <p>ha sido agregado al pedido</p>
            <button className="submit-button" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
