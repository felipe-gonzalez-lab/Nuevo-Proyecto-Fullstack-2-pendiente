import { useState } from 'react'
import GraficoStock from './GraficoStock'

function PanelAdministrador({
  productos,
  actualizarStock,
  agregarProducto,
  editarProducto,
  eliminarProducto,
  pedidos,
  actualizarEstadoPedido
}) {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    imagen: '',
    descripcion: ''
  })

  const [productoEditandoId, setProductoEditandoId] = useState(null)

  const manejarCambioFormulario = (e) => {
    const { name, value } = e.target

    setNuevoProducto({
      ...nuevoProducto,
      [name]: value
    })
  }

  const validarNuevoProducto = () => {
    const precio = Number(nuevoProducto.precio)
    const stock = nuevoProducto.stock === '' ? 0 : Number(nuevoProducto.stock)

    if (nuevoProducto.nombre.trim() === '') {
      alert('El nombre del producto es obligatorio.')
      return false
    }

    if (nuevoProducto.categoria.trim() === '') {
      alert('La categoría del producto es obligatoria.')
      return false
    }

    if (nuevoProducto.precio === '') {
      alert('El precio del producto es obligatorio.')
      return false
    }

    if (Number.isNaN(precio)) {
      alert('El precio debe ser un número válido.')
      return false
    }

    if (precio < 10000) {
      alert('El precio mínimo permitido es de $10.000.')
      return false
    }

    if (Number.isNaN(stock)) {
      alert('El stock debe ser un número válido.')
      return false
    }

    if (stock < 0) {
      alert('El stock no puede ser negativo.')
      return false
    }

    if (stock > 50) {
      alert('El stock máximo permitido es de 50 unidades.')
      return false
    }

    if (!Number.isInteger(stock)) {
      alert('El stock debe ser un número entero, sin decimales.')
      return false
    }

    if (nuevoProducto.imagen.trim() === '') {
      alert('La URL de la imagen es obligatoria.')
      return false
    }

    if (nuevoProducto.descripcion.trim() === '') {
      alert('La descripción del producto es obligatoria.')
      return false
    }

    return true
  }

  const limpiarFormularioProducto = () => {
    setNuevoProducto({
      nombre: '',
      categoria: '',
      precio: '',
      stock: '',
      imagen: '',
      descripcion: ''
    })

    setProductoEditandoId(null)
  }

  const manejarAgregarProducto = (e) => {
    e.preventDefault()

    if (!validarNuevoProducto()) {
      return
    }

    const productoParaGuardar = {
      nombre: nuevoProducto.nombre.trim(),
      categoria: nuevoProducto.categoria.trim(),
      precio: Number(nuevoProducto.precio),
      stock: nuevoProducto.stock === '' ? 0 : Number(nuevoProducto.stock),
      imagen: nuevoProducto.imagen.trim(),
      descripcion: nuevoProducto.descripcion.trim()
    }

    if (productoEditandoId) {
      editarProducto({
        ...productoParaGuardar,
        id: productoEditandoId
      })

      alert('Producto actualizado correctamente.')
    } else {
      agregarProducto(productoParaGuardar)
      alert('Producto agregado correctamente.')
    }

    limpiarFormularioProducto()
  }

  const cargarProductoParaEditar = (producto) => {
    setProductoEditandoId(producto.id)

    setNuevoProducto({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: String(producto.precio),
      stock: String(producto.stock),
      imagen: producto.imagen,
      descripcion: producto.descripcion
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const manejarCambioStock = (idProducto, valorIngresado) => {
    if (valorIngresado === '') {
      actualizarStock(idProducto, 0)
      return
    }

    const nuevoStock = Number(valorIngresado)

    if (Number.isNaN(nuevoStock)) {
      alert('El stock debe ser un número válido.')
      return
    }

    if (nuevoStock < 0) {
      alert('El stock no puede ser negativo.')
      return
    }

    if (nuevoStock > 50) {
      alert('El stock máximo permitido es de 50 unidades.')
      return
    }

    if (!Number.isInteger(nuevoStock)) {
      alert('El stock debe ser un número entero, sin decimales.')
      return
    }

    actualizarStock(idProducto, nuevoStock)
  }

  const bloquearCaracteresInvalidosStock = (e) => {
    if (e.key === '-' || e.key === '+' || e.key === '.' || e.key === ',') {
      e.preventDefault()
    }
  }

  const bloquearCaracteresInvalidosPrecio = (e) => {
    if (e.key === '-' || e.key === '+') {
      e.preventDefault()
    }
  }

  const obtenerClaseEstado = (estado) => {
    if (estado === 'Pendiente') {
      return 'badge bg-warning text-dark'
    }

    if (estado === 'En preparación') {
      return 'badge bg-primary'
    }

    if (estado === 'Enviado') {
      return 'badge bg-info text-dark'
    }

    if (estado === 'Entregado') {
      return 'badge bg-success'
    }

    if (estado === 'Cancelado') {
      return 'badge bg-danger'
    }

    return 'badge bg-secondary'
  }

  return (
    <section className="container my-5">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h2 className="fw-bold mb-3">Panel de Administrador</h2>

          <p className="text-muted">
            Desde esta sección el administrador puede gestionar productos,
            revisar el stock disponible, visualizar información relevante y
            actualizar el estado de los pedidos.
          </p>

          <div className="row g-3 mt-4">
            <div className="col-md-4">
              <div className="card h-100 border-primary">
                <div className="card-body">
                  <h5 className="card-title">Productos</h5>
                  <p className="card-text">
                    Total de productos registrados en la tienda.
                  </p>
                  <h3 className="fw-bold">{productos.length}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-success">
                <div className="card-body">
                  <h5 className="card-title">Pedidos</h5>
                  <p className="card-text">
                    Pedidos realizados por los clientes.
                  </p>
                  <h3 className="fw-bold">{pedidos.length}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-warning">
                <div className="card-body">
                  <h5 className="card-title">Bajo stock</h5>
                  <p className="card-text">
                    Productos con 3 o menos unidades disponibles.
                  </p>
                  <h3 className="fw-bold">
                    {productos.filter((producto) => producto.stock <= 3).length}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <GraficoStock productos={productos} />

          <hr className="my-4" />

          <h4 className="fw-bold mb-3">
            {productoEditandoId ? 'Editar producto' : 'Agregar nuevo producto'}
          </h4>

          {productoEditandoId && (
            <div className="alert alert-warning">
              Estás editando un producto existente. Guarda los cambios o cancela
              la edición.
            </div>
          )}

          <form onSubmit={manejarAgregarProducto} className="mb-5">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre del producto</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={nuevoProducto.nombre}
                  onChange={manejarCambioFormulario}
                  placeholder="Ej: Audífonos Bluetooth"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Categoría</label>
                <select
                  className="form-select"
                  name="categoria"
                  value={nuevoProducto.categoria}
                  onChange={manejarCambioFormulario}
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Notebooks">Notebooks</option>
                  <option value="Accesorios">Accesorios</option>
                  <option value="Monitores">Monitores</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  min="10000"
                  value={nuevoProducto.precio}
                  onKeyDown={bloquearCaracteresInvalidosPrecio}
                  onChange={manejarCambioFormulario}
                  placeholder="Ej: 29990"
                />
                <small className="text-muted">
                  Precio mínimo: $10.000.
                </small>
              </div>

              <div className="col-md-6">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  min="0"
                  max="50"
                  step="1"
                  value={nuevoProducto.stock}
                  onKeyDown={bloquearCaracteresInvalidosStock}
                  onChange={manejarCambioFormulario}
                  placeholder="Ej: 10"
                />
                <small className="text-muted">
                  Si se deja vacío, se guardará como 0. Máximo 50 unidades.
                </small>
              </div>

              <div className="col-md-12">
                <label className="form-label">URL de imagen</label>
                <input
                  type="text"
                  className="form-control"
                  name="imagen"
                  value={nuevoProducto.imagen}
                  onChange={manejarCambioFormulario}
                  placeholder="https://..."
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  name="descripcion"
                  value={nuevoProducto.descripcion}
                  onChange={manejarCambioFormulario}
                  rows="3"
                  placeholder="Describe brevemente el producto"
                ></textarea>
              </div>

              <div className="col-md-12 d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {productoEditandoId ? 'Guardar cambios' : 'Agregar producto'}
                </button>

                {productoEditandoId && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={limpiarFormularioProducto}
                  >
                    Cancelar edición
                  </button>
                )}
              </div>
            </div>
          </form>

          <hr className="my-4" />

          <h4 className="fw-bold mb-3">Gestión de stock</h4>

          <div className="table-responsive mb-5">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock actual</th>
                  <th>Actualizar stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>${producto.precio.toLocaleString('es-CL')}</td>
                    <td>
                      {producto.stock > 0 ? (
                        producto.stock
                      ) : (
                        <span className="badge bg-danger">Sin stock</span>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        max="50"
                        step="1"
                        value={producto.stock}
                        onKeyDown={bloquearCaracteresInvalidosStock}
                        onChange={(e) =>
                          manejarCambioStock(producto.id, e.target.value)
                        }
                      />
                      <small className="text-muted">
                        Mínimo 0, máximo 50 unidades.
                      </small>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => cargarProductoParaEditar(producto)}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => eliminarProducto(producto.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="fw-bold mb-3">Gestión de pedidos</h4>

          {pedidos.length === 0 ? (
            <div className="alert alert-info">
              Todavía no hay pedidos registrados.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID Pedido</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Correo</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>{pedido.id}</td>
                      <td>{pedido.fecha}</td>
                      <td>{pedido.cliente}</td>
                      <td>{pedido.correoCliente}</td>
                      <td>
                        <ul className="mb-0">
                          {pedido.productos.map((producto) => (
                            <li key={producto.id}>
                              {producto.nombre} x {producto.cantidad}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>${pedido.total.toLocaleString('es-CL')}</td>
                      <td>
                        <div className="d-flex flex-column gap-2">
                          <span className={obtenerClaseEstado(pedido.estado)}>
                            {pedido.estado}
                          </span>

                          <select
                            className="form-select"
                            value={pedido.estado}
                            onChange={(e) =>
                              actualizarEstadoPedido(pedido.id, e.target.value)
                            }
                          >
                            <option value="Pendiente">Pendiente</option>
                            <option value="En preparación">En preparación</option>
                            <option value="Enviado">Enviado</option>
                            <option value="Entregado">Entregado</option>
                            <option value="Cancelado">Cancelado</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PanelAdministrador