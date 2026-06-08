import { useState } from 'react'
import './App.css'
import { productosIniciales } from './data/productos'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CatalogoProductos from './components/CatalogoProductos'
import Carrito from './components/Carrito'
import FormularioContacto from './components/FormularioContacto'
import Footer from './components/Footer'

function App() {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [carrito, setCarrito] = useState([])

  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  })

  const [errores, setErrores] = useState({})
  const [mensajeEnviado, setMensajeEnviado] = useState('')

  const productosFiltrados = productosIniciales.filter((producto) => {
    const coincideNombre = producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoria === 'Todas' || producto.categoria === categoria
    return coincideNombre && coincideCategoria
  })

  const agregarAlCarrito = (producto) => {
    const productoExiste = carrito.find((item) => item.id === producto.id)

    if (productoExiste) {
      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
      setCarrito(carritoActualizado)
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }])
    }
  }

  const aumentarCantidad = (idProducto) => {
    const carritoActualizado = carrito.map((item) =>
      item.id === idProducto
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
  )

    setCarrito(carritoActualizado)
  }

  const disminuirCantidad = (idProducto) => {
    const carritoActualizado = carrito
      .map((item) =>
        item.id === idProducto
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
      .filter((item) => item.cantidad > 0)
    
    setCarrito(carritoActualizado)
  }

  const eliminarDelCarrito = (idProducto) => {
    const carritoActualizado = carrito.filter((item) => item.id !== idProducto)
    setCarrito(carritoActualizado)
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const manejarCambioFormulario = (e) => {
    const { name, value } = e.target

    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (formulario.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres.'
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo)

    if (!correoValido) {
      nuevosErrores.correo = 'Ingresa un correo electrónico válido.'
    }

    if (formulario.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
    }

    return nuevosErrores
  }

  const manejarEnvioFormulario = (e) => {
    e.preventDefault()

    const erroresValidacion = validarFormulario()
    setErrores(erroresValidacion)

    if (Object.keys(erroresValidacion).length === 0) {
      setMensajeEnviado('Tu consulta fue enviada correctamente.')
      setFormulario({
        nombre: '',
        correo: '',
        mensaje: ''
      })
    } else {
      setMensajeEnviado('')
    }
  }

  const totalCarrito = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  )

  return (
    <>
      <Navbar />

      <main id="inicio">
        <Hero />

        <CatalogoProductos
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          categoria={categoria}
          setCategoria={setCategoria}
          productosFiltrados={productosFiltrados}
          agregarAlCarrito={agregarAlCarrito}
        />
        <Carrito
          carrito={carrito}
          totalCarrito={totalCarrito}
          aumentarCantidad={aumentarCantidad}
          disminuirCantidad={disminuirCantidad}
          eliminarDelCarrito={eliminarDelCarrito}
          vaciarCarrito={vaciarCarrito}
        />
        <FormularioContacto
          formulario={formulario}
          errores={errores}
          mensajeEnviado={mensajeEnviado}
          manejarCambioFormulario={manejarCambioFormulario}
          manejarEnvioFormulario={manejarEnvioFormulario}
        />
      </main>
      
      <Footer />
      
    </>
  )
}

export default App