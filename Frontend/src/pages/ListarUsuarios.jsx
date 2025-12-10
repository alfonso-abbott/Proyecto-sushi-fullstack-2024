import React, { useEffect, useState } from 'react';
import './Modal.css'; 
import './ListStyles.css'; 

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/listarusuarios');
        const data = await response.json();

        if (response.ok) {
          setUsuarios(data);
        } else {
          setErrorMessage(data.mensaje || 'Error al obtener los usuarios');
        }
      } catch (error) {
        setErrorMessage('Error al conectar con el servidor');
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="formulario">
      <h2 className="text-2xl mb-4">Listado de Usuarios</h2>
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarUsuarios;
