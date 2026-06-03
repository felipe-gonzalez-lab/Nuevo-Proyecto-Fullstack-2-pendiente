import { useState } from 'react'
import './App.css'
import { productosIniciales } from './data/productos' 

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
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand fw-bold" href="#inicio">
              TecnoStore
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menuPrincipal"
              aria-controls="menuPrincipal"
              aria-expanded="false"
              aria-label="Abrir menú de navegación"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="menuPrincipal">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#inicio">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#productos">Productos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#carrito">Carrito</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contacto">Contacto</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main id="inicio">
        <section className="hero-section text-white">
          <div className="container py-5">
            <div className="row align-items-center min-vh-100">
              <div className="col-md-6">
                <h1 className="display-4 fw-bold">
                  Tecnología para estudiar, trabajar y crear
                </h1>
                <p className="lead">
                  Encuentra notebooks, accesorios y monitores con una experiencia de compra simple,
                  rápida y segura.
                </p>
                <a href="#productos" className="btn btn-primary btn-lg">
                  Ver productos
                </a>
              </div>

              <div className="col-md-6">
                <div
                  id="carruselTecnologia"
                  className="carousel slide shadow rounded"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner rounded">
                    <div className="carousel-item active">
                      <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
                        className="d-block w-100 carousel-img"
                        alt="Notebook sobre escritorio de trabajo"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80"
                        className="d-block w-100 carousel-img"
                        alt="Monitor de computador"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80"
                        className="d-block w-100 carousel-img"
                        alt="Teclado tecnológico"
                      />
                    </div>
                  </div>

                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carruselTecnologia"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                  </button>

                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carruselTecnologia"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Siguiente</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="productos" className="container py-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Catálogo de productos</h2>
            <p className="text-muted">
              Busca productos por nombre o filtra por categoría.
            </p>
          </div>

          <div className="row mb-4 g-3">
            <div className="col-md-6">
              <label htmlFor="busqueda" className="form-label">
                Buscar producto
              </label>
              <input
                id="busqueda"
                type="text"
                className="form-control"
                placeholder="Ejemplo: notebook, mouse, monitor"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="categoria" className="form-label">
                Filtrar por categoría
              </label>
              <select
                id="categoria"
                className="form-select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="Todas">Todas</option>
                <option value="Notebooks">Notebooks</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Monitores">Monitores</option>
              </select>
            </div>
          </div>

          <div className="row g-4">
            {productosFiltrados.map((producto) => (
              <article className="col-md-6 col-lg-4" key={producto.id}>
                <div className="card h-100 shadow-sm product-card">
                  <img
                    src={producto.imagen}
                    className="card-img-top product-img"
                    alt={producto.nombre}
                  />
                  <div className="card-body d-flex flex-column">
                    <span className="badge bg-primary mb-2 align-self-start">
                      {producto.categoria}
                    </span>
                    <h3 className="card-title h5">{producto.nombre}</h3>
                    <p className="card-text text-muted">{producto.descripcion}</p>
                    <p className="mb-1">
                      <strong>Precio:</strong> ${producto.precio.toLocaleString('es-CL')}
                    </p>
                    <p className="mb-3">
                      <strong>Stock:</strong> {producto.stock} unidades
                    </p>
                    <button
                      className="btn btn-outline-primary mt-auto"
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="carrito" className="bg-light py-5">
          <div className="container">
            <h2 className="fw-bold text-center mb-4">Carrito de compras</h2>

            {carrito.length === 0 ? (
              <p className="text-center text-muted">Tu carrito está vacío.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered align-middle bg-white">
                  <thead className="table-dark">
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio unitario</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((producto) => (
                      <tr key={producto.id}>
                        <td>{producto.nombre}</td>
                        <td>{producto.cantidad}</td>
                        <td>${producto.precio.toLocaleString('es-CL')}</td>
                        <td>${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-end">
                  <h3 className="h4">
                    Total: ${totalCarrito.toLocaleString('es-CL')}
                  </h3>
                  <button className="btn btn-success">
                    Simular pedido
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

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