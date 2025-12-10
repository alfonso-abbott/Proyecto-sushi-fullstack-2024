import React, { useEffect, useState } from 'react';
import './Modal.css'; 
import './ListStyles.css'; 

const ListarPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/listarPedidos');
        const data = await response.json();

        if (response.ok) {
          setPedidos(data);
        } else {
          setErrorMessage(data.mensaje || 'Error al obtener los pedidos');
        }
      } catch (error) {
        setErrorMessage('Error al conectar con el servidor');
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div className="formulario">
      <h2 className="text-2xl mb-4">Listado de Pedidos</h2>
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Número de Pedido</th>
              <th>Cliente</th>
              <th>Dirección</th>
              <th>Total</th>
              <th>Estado de Pago</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido._id}>
                <td>{pedido.numeropedido}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.direccion}</td>
                <td>${Number(pedido.total).toLocaleString()} CLP</td>
                <td
                  className={
                    pedido.estadopago === 'PAGADO'
                      ? 'estado-pagado'
                      : 'estado-pendiente'
                  }
                >
                  {pedido.estadopago}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarPedidos;
