import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { Link } from 'react-router-dom';
import './Modal.css'; // Usamos el mismo archivo CSS del modal

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Hook para redirigir a la página de inicio

  const onSubmit = async (data) => {
    try {
      // Llamada al backend con fetch
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Si el inicio de sesión es exitoso, muestra el modal
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
      } else {
        // Manejar errores del backend
        alert(result.mensaje || 'Error al iniciar sesión. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Hubo un error en el servidor. Inténtalo más tarde.');
    }
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
      <h2>Iniciar Sesión</h2>
      <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Ingrese su correo electrónico"
          {...register('email', { required: true })}
        />
        {errors.email && <span className="error-message">El correo electrónico es obligatorio</span>}

        <input
          type="password"
          placeholder="Ingrese su contraseña"
          {...register('password', { required: true })}
        />
        {errors.password && <span className="error-message">La contraseña es obligatoria</span>}

        <button type="submit" className="submit-button">
          Iniciar Sesión
        </button>
      </form>

      <div className="links">
        <Link to="/registro">¿No tienes cuenta? Regístrate</Link>
        <br />
        <br />
        <Link to="/recuperar-password">¿Olvidaste tu contraseña?</Link>
      </div>

      {/* Modal básico con JavaScript y CSS */}
      <div id="myModal" className="modal">
        <div className="modal-content">
          <h2>Inicio de sesión exitoso</h2>
          <p>Has iniciado sesión correctamente.</p>
          <button className="submit-button" onClick={closeModal}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
