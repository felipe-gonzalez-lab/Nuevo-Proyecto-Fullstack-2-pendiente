import GraficoStock from './GraficoStock'

function PanelAdministrador({
  productos,
  actualizarStock,
  pedidos,
  actualizarEstadoPedido
}) {
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
                        value={producto.stock}
                        onChange={(e) =>
                          actualizarStock(producto.id, Number(e.target.value))
                        }
                      />
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