const API_URL = 'http://localhost:3001/api/productos'

export const obtenerProductos = async () => {
  const respuesta = await fetch(API_URL)

  if (!respuesta.ok) {
    throw new Error('Error al obtener los productos.')
  }

  return await respuesta.json()
}

export const crearProducto = async (producto) => {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })

  if (!respuesta.ok) {
    const error = await respuesta.json()
    throw new Error(error.mensaje || 'Error al crear el producto.')
  }

  return await respuesta.json()
}

export const actualizarProducto = async (id, producto) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })

  if (!respuesta.ok) {
    const error = await respuesta.json()
    throw new Error(error.mensaje || 'Error al actualizar el producto.')
  }

  return await respuesta.json()
}

export const eliminarProductoPorId = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!respuesta.ok) {
    const error = await respuesta.json()
    throw new Error(error.mensaje || 'Error al eliminar el producto.')
  }

  return await respuesta.json()
}