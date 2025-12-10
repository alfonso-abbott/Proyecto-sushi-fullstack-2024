import React from 'react';

const Inicio = () => {
  return (
    <div className="fondo">

      <div className="descripcion">
        <h1 className="text-4xl font-bold">Fukusuke Sushi - Delivery</h1>
        <h2>Ven a comer el mejor sushi de Santiago</h2>
        <p>
          Fukusuke Sushi ofrece delivery a domicilio con los mejores ingredientes y frescura.
          Prueba nuestra variedad de rolls, nigiris, y platos especiales con promociones exclusivas.
        </p>
      </div>
 
      <div className="descripcion">
       
        <p>
        Dirección: Av. Providencia 1234, Santiago, Chile
        </p>
        
        <p>
        Teléfono: +56 2 1234 5678
        </p>
        <p>
        Clientes Activos: 251
        </p>
        <p>
        Pedidos Despachados: 1538
        </p>
        <p>
        © {new Date().getFullYear()} Fukusuke Sushi. Todos los derechos reservados.
        </p>
      </div>

    

    
      

    </div>


    
  );
};

export default Inicio;
