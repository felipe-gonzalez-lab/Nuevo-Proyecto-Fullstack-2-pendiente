const API_URL = `${import.meta.env.VITE_API_URL}/api/pedidos`

export const obtenerPedidos = async () => {
  const respuesta = await fetch(API_URL)

  if (!respuesta.ok) {
    throw new Error('Error al obtener los pedidos.')
  }

  return await respuesta.json()
}

export const crearPedidoBackend = async (pedido) => {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pedido)
  })

  if (!respuesta.ok) {
    const error = await respuesta.json()
    throw new Error(error.mensaje || 'Error al crear el pedido.')
  }

  return await respuesta.json()
}

export const actualizarEstadoPedidoBackend = async (idPedido, estado) => {
  const respuesta = await fetch(`${API_URL}/${idPedido}/estado`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ estado })
  })

  if (!respuesta.ok) {
    const error = await respuesta.json()
    throw new Error(error.mensaje || 'Error al actualizar el estado del pedido.')
  }

  return await respuesta.json()
}