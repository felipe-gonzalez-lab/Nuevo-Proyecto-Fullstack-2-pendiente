import { useState } from 'react'
import './App.css'
import { productosIniciales } from './data/productos'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CatalogoProductos from './components/CatalogoProductos'
import Carrito from './components/Carrito'

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
        />

        <section id="contacto" className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold text-center mb-4">Formulario de contacto</h2>

              <form
                className="card shadow-sm p-4"
                onSubmit={manejarEnvioFormulario}
                noValidate
              >
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                    id="nombre"
                    name="nombre"
                    placeholder="Ingresa tu nombre"
                    autoComplete="name"
                    value={formulario.nombre}
                    onChange={manejarCambioFormulario}
                  />
                  {errores.nombre && (
                    <div className="invalid-feedback">
                      {errores.nombre}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                    id="correo"
                    name="correo"
                    placeholder="nombre@correo.com"
                    autoComplete="email"
                    value={formulario.correo}
                    onChange={manejarCambioFormulario}
                  />
                  {errores.correo && (
                    <div className="invalid-feedback">
                      {errores.correo}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label">
                    Mensaje
                  </label>
                  <textarea
                    className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    placeholder="Escribe tu consulta"
                    value={formulario.mensaje}
                    onChange={manejarCambioFormulario}
                  ></textarea>
                  {errores.mensaje && (
                    <div className="invalid-feedback">
                      {errores.mensaje}
                    </div>
                  )}
                </div>

                {mensajeEnviado && (
                  <div className="alert alert-success" role="alert">
                    {mensajeEnviado}
                  </div>
                )}

                <button type="submit" className="btn btn-primary">
                  Enviar consulta
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p className="mb-1">TecnoStore | Tienda online de productos tecnológicos</p>
          <p className="mb-0">Proyecto académico Fullstack II</p>
        </div>
      </footer>
    </>
  )
}

export default App