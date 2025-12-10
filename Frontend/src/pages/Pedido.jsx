import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css'; // Asegúrate de que el CSS del modal esté importado correctamente

const Pedido = () => {
  const [pedido, setPedido] = useState([
    { nombre: "Tempura Panko Rolls", precio: 9000, imagen: "src/img/sushi1.jpg" },
    { nombre: "Sushi Nigiri", precio: 7000, imagen: "src/img/sushi2.jpg" },
    { nombre: "Maki de Atún", precio: 7500, imagen: "src/img/sushi3.jpg" },
  ]);

  const costoEnvio = 2000; // Costo fijo de envío
  const [direccion, setDireccion] = useState('');
  const [formaPago, setFormaPago] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();

  // Recalcular el total cuando cambie el pedido
  const total = pedido.reduce((acc, plato) => acc + plato.precio, 0);

  // Función para manejar el pago y enviar los datos al backend
  const handlePagar = async () => {
    if (direccion.trim() === '') {
      setModalMessage('Por favor, ingresa una dirección de despacho.');
      setIsModalVisible(true);
      return;
    }

    if (formaPago.trim() === '') {
      setModalMessage('Por favor, selecciona una forma de pago.');
      setIsModalVisible(true);
      return;
    }

    // Datos del pedido que se enviarán al backend
    const pedidoData = {
      numeropedido: `PED-${Date.now()}`, // Generar un número de pedido único
      cliente: "Cliente Demo", // Información de cliente (puede ajustarse)
      direccion,
      total: total + costoEnvio,
      estadopago: "Pendiente",
      items: pedido.map((plato) => ({
        nombre: plato.nombre,
        precio: plato.precio,
      })),
      formaPago,
    };

    try {
      // Realizar la solicitud POST al backend
      const response = await fetch('http://localhost:5000/api/pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });

      if (response.ok) {
        const result = await response.json();
        setModalMessage(result.mensaje || 'Pedido registrado con éxito.');
        setPedido([]); // Vaciar el pedido tras el registro exitoso
      } else {
        const errorResult = await response.json();
        setModalMessage(errorResult.mensaje || 'Error al registrar el pedido.');
      }
    } catch (error) {
      setModalMessage('Error de conexión con el servidor.');
    }

    setIsModalVisible(true);
  };

  // Eliminar un plato del pedido
  const handleEliminarPlato = (index) => {
    const nuevoPedido = [...pedido];
    nuevoPedido.splice(index, 1); // Eliminar el plato por índice
    setPedido(nuevoPedido); // Actualizar el pedido
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="formulario-pedido p-6">
      <h2 className="text-2xl mb-4">Mi Pedido</h2>
      {pedido.length === 0 ? (
        <p>No hay platos en el carrito.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {pedido.map((plato, index) => (
              <li key={index} className="flex justify-between border-b py-2 items-center">
                <div className="flex items-center">
                  <img src={plato.imagen} alt={plato.nombre} className="w-16 h-16 object-cover mr-4" />
                  <br />
                  <span>{plato.nombre}</span>
                </div>
                <span>${plato.precio.toLocaleString()} CLP</span>
                <br />
                <br />
                <button
                  onClick={() => handleEliminarPlato(index)}
                  className="submit-button-red"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <p className="font-bold">Costo de Envío : ${costoEnvio.toLocaleString()} CLP</p>
          <p className="font-bold">TOTAL : ${(total + costoEnvio).toLocaleString()} CLP</p>

          <div className="mt-4">
            <label htmlFor="direccion" className="block mb-2">Ingresa tu dirección de despacho:</label>
            <input
              type="text"
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Dirección de despacho"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="forma-pago" className="block mb-2">Selecciona tu forma de pago:</label>
            <select
              id="forma-pago"
              value={formaPago}
              onChange={(e) => setFormaPago(e.target.value)}
              className="select-styled"
            >
              <option value="">Seleccione...</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Debito">Débito</option>
              <option value="Credito">Crédito</option>
            </select>
          </div>

          <button className="submit-button" onClick={handlePagar}>
            Pagar
          </button>
        </div>
      )}

      {/* Modal para mensajes de error o éxito */}
      {isModalVisible && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button className="submit-button" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedido;


