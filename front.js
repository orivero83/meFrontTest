document.addEventListener('DOMContentLoaded', () => {


   /////////////////////////// POST POST //////////////////////////////////////////////////
  const formulario = document.getElementById('formulario-transaccion');
  formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nuevaTransaccion = {
      tipo_pago: document.getElementById('tipoPago').value,
      estado: document.getElementById('estado').value,
      monto: parseFloat(document.getElementById('monto').value),
      moneda: document.getElementById('moneda').value,
      id_pago: document.getElementById('IDdePago').value,
      id_usuario: document.getElementById('IDdeUsuario').value,
      nombre_persona: document.getElementById('NombrePersona').value,
      email_persona: document.getElementById('EmailPersona').value,
    };

    try {
      const response = await fetch('http://localhost:3000/transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaTransaccion),
      });

      if (!response.ok) {
        throw new Error('Error al crear la transacción');
      }

      // Actualizar la lista de transacciones después de crear una nueva
      obtenerTransacciones();
    } catch (error) {
      console.error('Error:', error);
    }
  });



   /////////////////////////// GET GET //////////////////////////////////////////////////
    // Obtener la lista de transacciones al cargar la página
    obtenerTransacciones();
  
    async function obtenerTransacciones() {
      try {
        const response = await fetch('http://localhost:3000/transacciones');
        if (!response.ok) {
          throw new Error('Error al obtener las transacciones');
        }
  
        const transacciones = await response.json();
        mostrarTransacciones(transacciones);
      } catch (error) {
        console.error('Error:', error);
      }
    }


       /////////////////////////// MOSTRAR EN EL DOM HTML //////////////////////////////////////////////////
  
    function mostrarTransacciones(transacciones) {
      const transaccionesList = document.getElementById('transacciones-list');
  
      // Limpiar la lista existente
      transaccionesList.innerHTML = '';
  
      // Crear elementos HTML para cada transacción y agregarlos a la lista
      transacciones.forEach((transaccion) => {
        const transaccionElement = document.createElement('div');
        transaccionElement.className = 'transaccion-item';
  
        // Puedes personalizar la presentación según tus necesidades
        transaccionElement.innerHTML = `
          <p>ID: ${transaccion.id}</p>
          <p>Fecha: ${transaccion.fecha}</p>
          <p>Tipo de Pago: ${transaccion.tipo_pago}</p>
          <p>Estado: ${transaccion.estado}</p>
          <p>Monto: ${transaccion.monto}</p>
          <p>Moneda: ${transaccion.moneda}</p>
          <p>ID de Pago: ${transaccion.id_pago}</p>
          <p>ID de Usuario: ${transaccion.id_usuario}</p>
          <p>Nombre Persona: ${transaccion.nombre_persona}</p>
          <p>Email Persona: ${transaccion.email_persona}</p>
        `;
  
        transaccionesList.appendChild(transaccionElement);
      });
    }
  });
  