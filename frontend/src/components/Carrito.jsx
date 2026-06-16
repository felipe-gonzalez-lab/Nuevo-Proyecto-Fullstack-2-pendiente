function Carrito({
  carrito,
  totalCarrito,
  aumentarCantidad,
  disminuirCantidad,
  eliminarDelCarrito,
  vaciarCarrito,
  crearPedido,
  mensajePedido,
  direccionPedido,
  setDireccionPedido
}) {
  return (
    <section id="carrito" className="bg-light py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-4">Carrito de compras</h2>

        {mensajePedido && (
          <div className="alert alert-success text-center" role="alert">
            {mensajePedido}
          </div>
        )}

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
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {carrito.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => disminuirCantidad(producto.id)}
                          aria-label={`Disminuir cantidad de ${producto.nombre}`}
                        >
                          -
                        </button>

                        <span>{producto.cantidad}</span>

                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => aumentarCantidad(producto.id)}
                          aria-label={`Aumentar cantidad de ${producto.nombre}`}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>${producto.precio.toLocaleString('es-CL')}</td>

                    <td>
                      ${(producto.precio * producto.cantidad).toLocaleString('es-CL')}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarDelCarrito(producto.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="row align-items-end g-3">
              <div className="col-md-7">
                <label className="form-label fw-semibold">
                  Dirección de entrega
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={direccionPedido}
                  onChange={(e) => setDireccionPedido(e.target.value)}
                  placeholder="Ej: Av. Providencia 1234, Santiago"
                />

                <small className="text-muted">
                  La dirección será registrada junto al pedido.
                </small>
              </div>

              <div className="col-md-5 text-md-end">
                <h3 className="h4">
                  Total: ${totalCarrito.toLocaleString('es-CL')}
                </h3>

                <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2">
                  <button
                    className="btn btn-outline-danger"
                    onClick={vaciarCarrito}
                  >
                    Vaciar carrito
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={crearPedido}
                  >
                    Crear pedido
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Carrito