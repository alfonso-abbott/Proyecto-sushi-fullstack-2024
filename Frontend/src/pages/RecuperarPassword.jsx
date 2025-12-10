import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Modal.css'; // Usamos el mismo archivo CSS del modal

const RecuperarPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Hook para redirigir a la página de inicio

  const onSubmit = (data) => {
    // Mostrar el modal cuando se envíen las instrucciones
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
  };

  const closeModal = () => {
    // Cerrar el modal
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';

     // Redirigir a la página de inicio
     navigate('/');
  };

  return (
    <div className="formulario">
      <h2>Recuperar Contraseña</h2>
      <form id="recoverForm" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese su correo electrónico"
          {...register('email', { required: true })}
        />
        {errors.email && <span className="error-message">Este campo es requerido</span>}

        <button type="submit" className="submit-button">
          Recuperar Contraseña
        </button>
      </form>

      {/* Modal básico con JavaScript y CSS */}
      <div id="myModal" className="modal">
        <div className="modal-content">
         
          <h2>Instrucciones enviadas</h2>
          <p>Se han enviado las instrucciones para recuperar la contraseña a su correo electrónico.</p>
          <button className="submit-button" onClick={closeModal}>
            Cerrar
          </button>
        </div>
      </div>

    </div>
  );
};

export default RecuperarPassword;

