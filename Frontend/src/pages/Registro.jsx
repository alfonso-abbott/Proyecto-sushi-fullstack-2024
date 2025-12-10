import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Modal.css'; 

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    sexo: '',
    email: '',
    password: ''
  });
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage('Usuario registrado con éxito');
      } else {
        setModalMessage(data.mensaje || 'Error al registrar usuario');
      }

      // Mostrar el modal
      const modal = document.getElementById('myModal');
      modal.style.display = 'block';
    } catch (error) {
      setModalMessage('Error en el servidor');
      const modal = document.getElementById('myModal');
      modal.style.display = 'block';
    }
  };

  const closeModal = () => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';

    // Si el registro fue exitoso, redirigir al inicio
    if (modalMessage === 'Usuario registrado con éxito') {
      navigate('/');
    }
  };

  return (
    <div>
      <div className="formulario">
        <h2>Formulario de Usuario</h2>
        <form id="userForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingrese nombre y apellido"
            id="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Ingrese dirección"
            id="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            required
          />

          <div className="radio-group">
            <label htmlFor="sexoHombre">Hombre</label>
            <input
              type="radio"
              name="sexo"
              value="Hombre"
              id="sexoHombre"
              onChange={(e) => handleInputChange({ target: { id: 'sexo', value: e.target.value } })}
              required
            />
            <label htmlFor="sexoMujer">Mujer</label>
            <input
              type="radio"
              name="sexo"
              value="Mujer"
              id="sexoMujer"
              onChange={(e) => handleInputChange({ target: { id: 'sexo', value: e.target.value } })}
              required
            />
          </div>

          <input
            type="email"
            placeholder="Ingrese email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Ingrese contraseña"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="submit-button">
            Enviar
          </button>
        </form>
      </div>

      <div id="myModal" className="modal">
        <div className="modal-content">
          <h2>{modalMessage}</h2>
          <button className="submit-button" onClick={closeModal}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registro;

