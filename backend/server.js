import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

let productos = [
  {
    id: 1,
    nombre: 'Notebook Lenovo IdeaPad 15',
    categoria: 'Notebooks',
    precio: 549990,
    stock: 8,
    imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
    descripcion: 'Notebook ideal para estudio, trabajo y navegación diaria.'
  },
  {
    id: 2,
    nombre: 'Notebook Asus VivoBook',
    categoria: 'Notebooks',
    precio: 629990,
    stock: 5,
    imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    descripcion: 'Equipo liviano, rápido y práctico para tareas diarias.'
  },
  {
    id: 3,
    nombre: 'Monitor Samsung 24 pulgadas',
    categoria: 'Monitores',
    precio: 129990,
    stock: 10,
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    descripcion: 'Monitor Full HD ideal para oficina, estudio y entretenimiento.'
  },
  {
    id: 4,
    nombre: 'Teclado mecánico RGB',
    categoria: 'Accesorios',
    precio: 59990,
    stock: 12,
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    descripcion: 'Teclado mecánico con iluminación RGB para escribir y jugar.'
  }
]

const validarProducto = (producto) => {
  const precio = Number(producto.precio)
  const stock = producto.stock === '' || producto.stock === null
    ? 0
    : Number(producto.stock)

  if (!producto.nombre || producto.nombre.trim() === '') {
    return 'El nombre del producto es obligatorio.'
  }

  if (!producto.categoria || producto.categoria.trim() === '') {
    return 'La categoría del producto es obligatoria.'
  }

  if (producto.precio === undefined || producto.precio === '') {
    return 'El precio del producto es obligatorio.'
  }

  if (Number.isNaN(precio)) {
    return 'El precio debe ser un número válido.'
  }

  if (precio < 10000) {
    return 'El precio mínimo permitido es de $10.000.'
  }

  if (Number.isNaN(stock)) {
    return 'El stock debe ser un número válido.'
  }

  if (stock < 0) {
    return 'El stock no puede ser negativo.'
  }

  if (stock > 50) {
    return 'El stock máximo permitido es de 50 unidades.'
  }

  if (!Number.isInteger(stock)) {
    return 'El stock debe ser un número entero.'
  }

  if (!producto.imagen || producto.imagen.trim() === '') {
    return 'La imagen del producto es obligatoria.'
  }

  if (!producto.descripcion || producto.descripcion.trim() === '') {
    return 'La descripción del producto es obligatoria.'
  }

  return null
}

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API TecnoStore funcionando correctamente'
  })
})

app.get('/api/productos', (req, res) => {
  res.json(productos)
})

app.get('/api/productos/:id', (req, res) => {
  const id = Number(req.params.id)
  const producto = productos.find((item) => item.id === id)

  if (!producto) {
    return res.status(404).json({
      mensaje: 'Producto no encontrado.'
    })
  }

  res.json(producto)
})

app.post('/api/productos', (req, res) => {
  const errorValidacion = validarProducto(req.body)

  if (errorValidacion) {
    return res.status(400).json({
      mensaje: errorValidacion
    })
  }

  const nuevoProducto = {
    id: Date.now(),
    nombre: req.body.nombre.trim(),
    categoria: req.body.categoria.trim(),
    precio: Number(req.body.precio),
    stock: req.body.stock === '' || req.body.stock === null
      ? 0
      : Number(req.body.stock),
    imagen: req.body.imagen.trim(),
    descripcion: req.body.descripcion.trim()
  }

  productos.push(nuevoProducto)

  res.status(201).json({
    mensaje: 'Producto creado correctamente.',
    producto: nuevoProducto
  })
})

app.put('/api/productos/:id', (req, res) => {
  const id = Number(req.params.id)
  const productoExiste = productos.find((item) => item.id === id)

  if (!productoExiste) {
    return res.status(404).json({
      mensaje: 'Producto no encontrado.'
    })
  }

  const errorValidacion = validarProducto(req.body)

  if (errorValidacion) {
    return res.status(400).json({
      mensaje: errorValidacion
    })
  }

  const productoActualizado = {
    id,
    nombre: req.body.nombre.trim(),
    categoria: req.body.categoria.trim(),
    precio: Number(req.body.precio),
    stock: req.body.stock === '' || req.body.stock === null
      ? 0
      : Number(req.body.stock),
    imagen: req.body.imagen.trim(),
    descripcion: req.body.descripcion.trim()
  }

  productos = productos.map((producto) =>
    producto.id === id ? productoActualizado : producto
  )

  res.json({
    mensaje: 'Producto actualizado correctamente.',
    producto: productoActualizado
  })
})

app.delete('/api/productos/:id', (req, res) => {
  const id = Number(req.params.id)
  const productoExiste = productos.find((item) => item.id === id)

  if (!productoExiste) {
    return res.status(404).json({
      mensaje: 'Producto no encontrado.'
    })
  }

  productos = productos.filter((producto) => producto.id !== id)

  res.json({
    mensaje: 'Producto eliminado correctamente.'
  })
})

app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`)
})